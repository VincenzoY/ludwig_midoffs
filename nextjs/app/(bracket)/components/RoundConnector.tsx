import { HEADER_HEIGHT } from "./Round";

interface RoundConnectorProps {
  from_match_count: number; // Number of matches in the previous round
  to_match_count: number; // Number of matches in the next round
  total_height: number; // Total height of the bracket area
}

// Calculate match center positions using justify-around logic
// justify-around: equal space around each item
function get_match_positions_around(
  match_count: number,
  total_height: number
): number[] {
  const positions: number[] = [];

  if (match_count === 1) {
    // Single match centered
    positions.push(total_height / 2);
  } else {
    // justify-around divides space equally, with half-space at edges
    // Each item gets: total_height / match_count of space
    // Item center is in the middle of its allocated space
    const slot_height = total_height / match_count;
    for (let i = 0; i < match_count; i++) {
      const center = slot_height * i + slot_height / 2;
      positions.push(center);
    }
  }

  return positions;
}

export function RoundConnector({
  from_match_count,
  to_match_count,
  total_height,
}: RoundConnectorProps) {
  const connector_width = 32;
  const horizontal_line = 12;

  // First round uses justify-between, others use justify-around
  const from_positions = get_match_positions_around(from_match_count, total_height);

  const to_positions = get_match_positions_around(
    to_match_count,
    total_height
  );

  // Generate paths connecting pairs of "from" matches to single "to" matches
  const paths: string[] = [];
  for (let i = 0; i < to_match_count; i++) {
    const from_top_y = from_positions[i * 2];
    const from_bottom_y = from_positions[i * 2 + 1];
    const to_y = to_positions[i];

    if (from_top_y !== undefined && from_bottom_y !== undefined) {
      // Top match to middle
      paths.push(
        `M 0 ${from_top_y} H ${horizontal_line} V ${to_y} H ${connector_width}`
      );
      // Bottom match to middle
      paths.push(`M 0 ${from_bottom_y} H ${horizontal_line} V ${to_y}`);
    } else if (from_top_y !== undefined) {
      // Only one source match (odd number case)
      paths.push(`M 0 ${from_top_y} H ${connector_width}`);
    }
  }

  return (
    <svg
      width={connector_width}
      height={total_height}
      className="shrink-0"
      style={{ marginTop: HEADER_HEIGHT }}
    >
      {paths.map((d, index) => (
        <path
          key={index}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="text-zinc-400 dark:text-zinc-600"
        />
      ))}
    </svg>
  );
}
