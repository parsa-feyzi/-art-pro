// features/data-table/components/DataTableFilters.tsx
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { RotateCcw, Search } from "lucide-react";
import { StatusFilter } from "../types/types";
import { STATUS_OPTIONS } from "../constants";

interface Props {
  searchTerm: string;
  statusFilter: StatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onReset: () => void;
}

export function DataTableFilters({ searchTerm, statusFilter, onSearchChange, onStatusChange, onReset }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, category, or author..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex gap-2">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(STATUS_OPTIONS).map(([key, { label, value }]) => (
              <SelectItem key={key} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={onReset} title="Reset filters">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}