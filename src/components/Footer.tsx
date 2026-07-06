import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-neutral-400">
        <p>{APP_NAME} — A free civic action map for the people of Hawaiʻi.</p>
        <p className="mt-1 text-neutral-500">Report it. Track it. Fix it.</p>
      </div>
    </footer>
  );
}