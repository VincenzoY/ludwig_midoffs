"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Modal from "@/components/GenericComponents/Modal/Modal";
import IconButton from "@/components/GenericComponents/IconButton/IconButton";
import CircleInfoIcon from "@/components/Icons/CircleInfoIcon/CircleInfoIcon";

const InfoModal = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Modal
      title="Info"
      visible={modal.visible}
      onClose={() => modal.hide()}
      onExited={() => modal.remove()}
    >
      <div className="min-w-75 max-w-md text-zinc-700 dark:text-zinc-300">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Privacy Policy
        </h3>
        <p className="mb-4">
          This site is not affiliated in any way with Ludwig, MCSR, Jerkoffs or any of the streamers involved in the event.
        </p>
        <p>
          I use Google Analytics to get anonymous web analytics.
        </p>
        <hr className="my-4 border-zinc-200 dark:border-zinc-600" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Personal Notes
        </h3>
        <p>
          I thought it might be cool to throw together a site for Ludwig&apos;s Jerkoffs since the Midoffs site was pretty helpful in tracking standings. Since this was only announced like a day ago and there is still barely any info, I&apos;ve only built out the tournament bracket and didn&apos;t have time for any prediction/pickems stuff. There also might be a bit of scuff since I only had a day to build this but I&apos;ll try to fix things as they come up. If you found this cool, maybe follow me{" "}
          <a
            href="https://x.com/yuyu933933"
            target="_blank"
            rel="noopener noreferrer"
            className="text-offbrand hover:underline"
          >
            @yuyu
          </a>
          {" "}where I make stuff sometimes.
        </p>
      </div>
    </Modal>
  );
});

export default function InfoButton() {
  return (
    <IconButton
      onClick={() => NiceModal.show(InfoModal)}
      className="fixed top-4 right-4 z-10"
      size="md"
      aria-label="Info"
    >
      <CircleInfoIcon className="w-5 h-5 fill-zinc-700 dark:fill-zinc-300" />
    </IconButton>
  );
}
