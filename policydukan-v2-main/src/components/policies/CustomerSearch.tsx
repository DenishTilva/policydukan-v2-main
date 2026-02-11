import * as React from "react";
import { Check, ChevronsUpDown, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const existingCustomers = [
  { id: "1", name: "Rajesh Kumar", mobile: "9876543210", email: "rajesh@email.com" },
  { id: "2", name: "Priya Sharma", mobile: "9876543211", email: "priya@email.com" },
  { id: "3", name: "Amit Patel", mobile: "9876543212", email: "amit@email.com" },
  { id: "4", name: "Sunita Verma", mobile: "9876543213", email: "sunita@email.com" },
  { id: "5", name: "Vikram Singh", mobile: "9876543214", email: "vikram@email.com" },
];

interface CustomerSearchProps {
  value: string;
  onChange: (value: string, customer?: typeof existingCustomers[0]) => void;
}

export function CustomerSearch({ value, onChange }: CustomerSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newCustomer, setNewCustomer] = React.useState({
    name: "",
    mobile: "",
    email: "",
  });

  const selectedCustomer = existingCustomers.find((c) => c.id === value);

  const handleAddCustomer = () => {
    // In real app, this would save to database
    const customer = {
      id: Date.now().toString(),
      ...newCustomer,
    };
    onChange(customer.id, customer);
    setDialogOpen(false);
    setOpen(false);
    setNewCustomer({ name: "", mobile: "", email: "" });
  };

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex-1 justify-between h-10"
          >
            {selectedCustomer ? (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{selectedCustomer.name}</span>
                <span className="text-muted-foreground text-xs">
                  ({selectedCustomer.mobile})
                </span>
              </div>
            ) : (
              <span className="text-muted-foreground">Search customer...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search by name or mobile..." />
            <CommandList>
              <CommandEmpty>No customer found.</CommandEmpty>
              <CommandGroup heading="Existing Customers">
                {existingCustomers.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    value={`${customer.name} ${customer.mobile}`}
                    onSelect={() => {
                      onChange(customer.id, customer);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === customer.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{customer.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {customer.mobile} • {customer.email}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter customer name"
                value={newCustomer.name}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                placeholder="Enter 10-digit mobile"
                value={newCustomer.mobile}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, mobile: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={newCustomer.email}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, email: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddCustomer}
                disabled={!newCustomer.name || !newCustomer.mobile}
              >
                Add Customer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
