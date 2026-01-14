import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function BookingSortFilter() {
  return (
    <div className="px-2 flex gap-1">
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent-old)" },
          { value: "startDate-asc", label: "Sort by date (earlier-later)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high-low)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low-high)" },
        ]}
      />
    </div>
  );
}
