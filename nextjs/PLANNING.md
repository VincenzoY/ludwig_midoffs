# Tournament Bracket Visualization - Planning Document

## Overview

Create a tournament bracket visualization page at `/bracket` for a 12-player single elimination tournament. Top 4 seeds receive a bye in the first round.

## Scope

**In scope:**
- Display a 12-player single elimination bracket
- Show 4 rounds (Round 1 → Quarterfinals → Semifinals → Final)
- Display bye matches (player vs null, auto-advance)
- Show match results (game wins) for completed matches
- Show winners advancing through rounds

**Out of scope (for now):**
- Interactive predictions
- Click handlers for selecting winners
- Prediction state management
- Backend persistence

## Data Structure

```typescript
// types.ts
type PlayerId = string;

interface Player {
  id: PlayerId;
  seed: number;
}

interface MatchResult {
  player_1_wins: number;
  player_2_wins: number;
  winner_id: PlayerId | null;
}

interface Match {
  round: number;                // 1 = Round 1, 2 = QF, 3 = SF, 4 = Final
  position: number;             // Position within round
  player_1_id: PlayerId | null;
  player_2_id: PlayerId | null;
  result: MatchResult | null;
}

interface Bracket {
  id: string;
  name: string;
  players: Player[];
  matches: Match[];
}
```

## Bracket Structure (12 players, 4 byes)

| Round | Position | Player 1 | Player 2 | Notes |
|-------|----------|----------|----------|-------|
| 1 | 0 | Seed 1 | null | Bye |
| 1 | 1 | Seed 8 | Seed 9 | |
| 1 | 2 | Seed 4 | null | Bye |
| 1 | 3 | Seed 5 | Seed 12 | |
| 1 | 4 | Seed 2 | null | Bye |
| 1 | 5 | Seed 7 | Seed 10 | |
| 1 | 6 | Seed 3 | null | Bye |
| 1 | 7 | Seed 6 | Seed 11 | |
| 2 | 0 | Winner 1-0 | Winner 1-1 | QF |
| 2 | 1 | Winner 1-2 | Winner 1-3 | QF |
| 2 | 2 | Winner 1-4 | Winner 1-5 | QF |
| 2 | 3 | Winner 1-6 | Winner 1-7 | QF |
| 3 | 0 | Winner 2-0 | Winner 2-1 | SF |
| 3 | 1 | Winner 2-2 | Winner 2-3 | SF |
| 4 | 0 | Winner 3-0 | Winner 3-1 | Final |

**Total: 15 matches** (8 in R1, 4 in QF, 2 in SF, 1 in Final)

## File Structure

| File | Purpose |
|------|---------|
| `app/bracket/page.tsx` | Server Component, renders Bracket |
| `app/bracket/components/Bracket.tsx` | Grid layout for all rounds |
| `app/bracket/components/Round.tsx` | Column of matches for a single round |
| `app/bracket/components/Match.tsx` | Single match display (two players + score) |
| `app/bracket/types.ts` | TypeScript types |
| `app/bracket/data/placeholder.ts` | Placeholder 12-player bracket data |
| `app/bracket/utils.ts` | Helper functions |

## Component Hierarchy

```
page.tsx (Server Component)
└── Bracket.tsx
    ├── Round.tsx (Round 1 - 8 matches)
    │   └── Match.tsx (×8)
    ├── Round.tsx (Quarterfinals - 4 matches)
    │   └── Match.tsx (×4)
    ├── Round.tsx (Semifinals - 2 matches)
    │   └── Match.tsx (×2)
    └── Round.tsx (Final - 1 match)
        └── Match.tsx (×1)
```

## Match Component Display

```
Completed match:
┌─────────────────────────┐
│ #1 Player-A         2   │  ← winner highlighted
├─────────────────────────┤
│ #8 Player-B         1   │
└─────────────────────────┘

Bye match:
┌─────────────────────────┐
│ #1 Player-A        BYE  │  ← auto-advance
├─────────────────────────┤
│    —                    │
└─────────────────────────┘

Pending match:
┌─────────────────────────┐
│ #1 Player-A             │
├─────────────────────────┤
│ #8 Player-B             │
└─────────────────────────┘
```

## Layout Design

```
ROUND 1          QUARTERFINALS      SEMIFINALS        FINAL
(8 matches)      (4 matches)        (2 matches)       (1 match)

Seed 1 (bye) ────┐
                 ├── QF Match ──┐
Seed 8 ──┐       │               │
Seed 9 ──┴───────┘               │
                                 ├── SF Match ──┐
Seed 4 (bye) ────┐               │               │
                 ├── QF Match ──┘               │
Seed 5 ──┐       │                               │
Seed 12 ─┴───────┘                               │
                                                 ├── FINAL
Seed 2 (bye) ────┐                               │
                 ├── QF Match ──┐               │
Seed 7 ──┐       │               │               │
Seed 10 ─┴───────┘               │               │
                                 ├── SF Match ──┘
Seed 3 (bye) ────┐               │
                 ├── QF Match ──┘
Seed 6 ──┐       │
Seed 11 ─┴───────┘
```

## Styling

- Tailwind CSS (consistent with existing project)
- CSS Grid for bracket layout (`grid-cols-4` for 4 rounds)
- Dark mode support via existing theme
- Winner rows highlighted
- Bye matches visually distinct

## Helper Functions (utils.ts)

- `get_player_by_id(players, id)` - Lookup player from bracket
- `is_bye_match(match)` - Check if match is a bye (player_2_id is null)
- `get_match_winner(match)` - Get winner from result
- `get_round_name(round)` - Get display name ("Round 1", "Quarterfinals", etc.)

## Implementation Order

1. Create `types.ts` with type definitions
2. Create `utils.ts` with helper functions
3. Create `data/placeholder.ts` with sample bracket data
4. Create `Match.tsx` component
5. Create `Round.tsx` component
6. Create `Bracket.tsx` component
7. Create `page.tsx` to render bracket
8. Style and polish
