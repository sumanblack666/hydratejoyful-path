
import { useState, useEffect } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { Droplet, Plus, ChevronDown, Calendar, MoreVertical } from "lucide-react";
import Navbar from "@/components/Navbar";
import { HydrationProgress } from "@/components/HydrationProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface HydrationEntry {
  id: string;
  amount: number;
  timestamp: Date;
  type: "water" | "coffee" | "tea" | "juice";
}

const HydrationLog = () => {
  const [entries, setEntries] = useState<HydrationEntry[]>(() => {
    // Generate some sample entries
    const today = new Date();
    return [
      {
        id: "1",
        amount: 250,
        timestamp: new Date(today.setHours(9, 30)),
        type: "water",
      },
      {
        id: "2",
        amount: 150,
        timestamp: new Date(today.setHours(11, 15)),
        type: "coffee",
      },
      {
        id: "3",
        amount: 500,
        timestamp: new Date(today.setHours(13, 0)),
        type: "water",
      },
      {
        id: "4",
        amount: 200,
        timestamp: new Date(today.setHours(15, 45)),
        type: "tea",
      },
    ];
  });
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAmount, setNewAmount] = useState(250);
  const [newType, setNewType] = useState<"water" | "coffee" | "tea" | "juice">("water");
  
  // Filter entries for the selected date
  const filteredEntries = entries.filter(entry => 
    isSameDay(entry.timestamp, selectedDate)
  );
  
  // Calculate total for the day
  const dailyTotal = filteredEntries.reduce((sum, entry) => sum + entry.amount, 0);
  
  // Generate week days
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  
  const addEntry = () => {
    const newEntry: HydrationEntry = {
      id: Math.random().toString(36).substring(2),
      amount: newAmount,
      timestamp: new Date(),
      type: newType,
    };
    
    setEntries(prev => [...prev, newEntry]);
    setShowAddForm(false);
    toast.success("Hydration logged successfully!");
  };
  
  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast.info("Entry removed");
  };
  
  const getEntryIcon = (type: string) => {
    switch (type) {
      case "water":
        return <Droplet className="h-4 w-4 text-hydration-500" fill="rgba(14, 165, 233, 0.2)" />;
      case "coffee":
        return <Droplet className="h-4 w-4 text-amber-700" fill="rgba(180, 83, 9, 0.2)" />;
      case "tea":
        return <Droplet className="h-4 w-4 text-green-600" fill="rgba(22, 163, 74, 0.2)" />;
      case "juice":
        return <Droplet className="h-4 w-4 text-orange-500" fill="rgba(249, 115, 22, 0.2)" />;
      default:
        return <Droplet className="h-4 w-4" />;
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 pb-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-1">Hydration Log</h1>
          <p className="text-muted-foreground">Track your daily water intake</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 order-2 md:order-1 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex flex-col gap-6">
              <Card className="glass-card animate-fade-in">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Daily Summary</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedDate(new Date())}
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex overflow-x-auto py-2 gap-2 mb-4">
                    {weekDays.map((day, i) => {
                      const isSelected = isSameDay(day, selectedDate);
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(day)}
                          className={`flex flex-col items-center min-w-[3rem] p-2 rounded-full transition-colors ${
                            isSelected 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-primary/10"
                          }`}
                        >
                          <span className="text-xs font-medium">
                            {format(day, "EEE")}
                          </span>
                          <span className={`text-sm ${isSelected ? "font-medium" : ""}`}>
                            {format(day, "d")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      {format(selectedDate, "PPPP")}
                    </div>
                    <div className="text-2xl font-bold">
                      {dailyTotal} ml
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card animate-fade-in" style={{ animationDelay: "200ms" }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Today's Entries</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setShowAddForm(!showAddForm)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {showAddForm && (
                    <div className="bg-background/50 p-4 rounded-lg mb-4 animate-fade-in">
                      <h3 className="font-medium mb-3">Add Hydration</h3>
                      <div className="flex flex-col gap-3">
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">Type</label>
                          <Select 
                            value={newType} 
                            onValueChange={(value) => setNewType(value as any)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="water">Water</SelectItem>
                              <SelectItem value="coffee">Coffee</SelectItem>
                              <SelectItem value="tea">Tea</SelectItem>
                              <SelectItem value="juice">Juice</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">Amount (ml)</label>
                          <Select 
                            value={newAmount.toString()} 
                            onValueChange={(value) => setNewAmount(parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="150">150 ml</SelectItem>
                              <SelectItem value="200">200 ml</SelectItem>
                              <SelectItem value="250">250 ml</SelectItem>
                              <SelectItem value="330">330 ml</SelectItem>
                              <SelectItem value="500">500 ml</SelectItem>
                              <SelectItem value="750">750 ml</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                            onClick={() => setShowAddForm(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm"
                            className="flex-1"
                            onClick={addEntry}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {filteredEntries.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      No entries for this day
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredEntries.map(entry => (
                        <div 
                          key={entry.id}
                          className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              {getEntryIcon(entry.type)}
                            </div>
                            <div>
                              <div className="font-medium capitalize">
                                {entry.type}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {format(entry.timestamp, "h:mm a")}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{entry.amount} ml</Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => deleteEntry(entry.id)}>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="md:col-span-7 order-1 md:order-2 animate-fade-in">
            <Card className="glass-card h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <h3 className="text-xl font-semibold mb-6 text-center">
                  Your Hydration Progress
                </h3>
                <HydrationProgress />
                
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  <Button
                    variant="outline" 
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setNewAmount(250);
                      setNewType("water");
                      setShowAddForm(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Water
                  </Button>
                  
                  <Button
                    variant="outline" 
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setNewAmount(150);
                      setNewType("coffee");
                      setShowAddForm(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Coffee
                  </Button>
                  
                  <Button
                    variant="outline" 
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setNewAmount(200);
                      setNewType("tea");
                      setShowAddForm(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Tea
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default HydrationLog;
