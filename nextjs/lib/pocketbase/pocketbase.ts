import PocketBase, { ListResult } from 'pocketbase';
import { RecordService } from 'pocketbase'
import { Bracket } from '@/lib/bracket/types';

interface PocketBaseDefaultFields {
  id: string,
  collectionId: string,
  collectionName: string,
  created: string,
  updated: string
}

export interface Player extends PocketBaseDefaultFields {
  name: string,
  stream: string,
  mc_username: string
}

export interface User extends PocketBaseDefaultFields {
    name: string,
    avatar: string
}

export interface BracketEntry extends PocketBaseDefaultFields {
    bracket: Bracket
}

export interface TypedPocketBase extends PocketBase {
    collection(idOrName: string): RecordService // default fallback for any other collection
    collection(idOrName: 'users'): RecordService<User>
    collection(idOrName: 'players'): RecordService<Player>
    collection(idOrName: 'brackets'): RecordService<BracketEntry>
}

export const PAGE_SIZE = 64;

export class PocketBaseWrapper {
    static POCKETBASE_ADDRESS = process.env.NEXT_PUBLIC_POCKETBASE_ADDRESS;
    static PAGE_SIZE = PAGE_SIZE

    basePocketBase: PocketBase

    constructor() {
        this.basePocketBase = new PocketBase(PocketBaseWrapper.POCKETBASE_ADDRESS) as TypedPocketBase;
        this.basePocketBase.autoCancellation(false)
    }

    async fetchRecordsFromCollectionByCustomField<T>(
        collection: string, 
        id: string, 
        values: Array<unknown>,
        fields?: Array<string>
    ): Promise<Array<T>> {
        let page_num = 0
        let page = values.slice(page_num * PocketBaseWrapper.PAGE_SIZE, (page_num + 1) * PocketBaseWrapper.PAGE_SIZE)
        const requests: Array<Promise<ListResult<T>>> = []
        for(; 
            page.length > 0; 
            page_num += 1, page = values.slice(page_num * PocketBaseWrapper.PAGE_SIZE, (page_num + 1) * PocketBaseWrapper.PAGE_SIZE)
        ) {
            requests.push(this.basePocketBase.collection(collection).getList<T>(1, PocketBaseWrapper.PAGE_SIZE, {
                filter: page.map((value) => `${id}="${value}"`).join("||"),
                ...(fields && {fields: fields.join(',')})
            }))
        }

        return new Promise(async (resolve) => {
            const responses = await Promise.all(requests)

            resolve(responses.map((response) => response["items"]).flat())
        })
    }

    async fetchAllRecordsInCollection<T>(
        collection: string,
        params: object = {}
    ): Promise<Array<T>> {
        const records = []
        let pageNum = 1

        while(true) {
            const collectionsFetch = (await this.basePocketBase.collection(collection).getList<T>(pageNum, PocketBaseWrapper.PAGE_SIZE, params))

            for(const record of collectionsFetch["items"]) {
                records.push(record)
            }

            if (collectionsFetch["page"] === collectionsFetch["totalPages"]) break

            pageNum += 1
        }

        return records
    }

    async fetchRecordFromCollectionById<T>(
        collection: string, 
        id: string, 
        params: object = {}
    ): Promise<T> {
        return await this.basePocketBase.collection(collection).getOne(id, params)
    }

    async createRecordInCollection<T>(
        collection: string,
        value: Record<string, unknown> | FormData
    ): Promise<T> {
        return await this.basePocketBase.collection(collection).create(value)
    }

}

const pb = new PocketBaseWrapper()

export default pb