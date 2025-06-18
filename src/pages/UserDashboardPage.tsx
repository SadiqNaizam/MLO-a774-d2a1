import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar'; // Assuming custom sidebar component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Shadcn Form
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Settings, BarChartHorizontalBig, Bell, Edit3, Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Mock data for saved comparisons and notifications
const savedComparisonsData = [
  { id: 'comp1', name: 'SpaceX vs NASA Launch Cadence (2020-2023)', dateSaved: '2024-07-15', entities: 'SpaceX, NASA', metric: 'Annual Launch Count' },
  { id: 'comp2', name: 'Budget Comparison: ISRO vs CNSA', dateSaved: '2024-06-28', entities: 'ISRO, CNSA', metric: 'Annual Budget' },
];

const notificationsData = [
  { id: 'notif1', message: 'New article published: "SpaceX Starship Update"', date: '2024-08-03', read: false },
  { id: 'notif2', message: 'Your saved comparison "SpaceX vs NASA" has new data available for 2024.', date: '2024-08-01', read: true },
  { id: 'notif3', message: 'NASA announced a new mission to Mars.', date: '2024-07-25', read: false },
];

// Zod schema for profile form
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  bio: z.string().max(160, { message: "Bio must not be longer than 160 characters." }).optional(),
  avatarUrl: z.string().url({ message: "Please enter a valid URL."}).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Default values for the form
const defaultProfileValues: Partial<ProfileFormValues> = {
  name: 'Astro User',
  email: 'user@example.com',
  bio: 'Passionate about space exploration and data analysis.',
  avatarUrl: 'https://images.unsplash.com/photo-1532786187998-801f00135992?q=80&w=400&auto=format&fit=crop' // Placeholder avatar
};


const UserDashboardPage = () => {
  console.log('UserDashboardPage loaded');
  const [activeSection, setActiveSection] = useState('profile'); // 'profile', 'comparisons', 'notifications'

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultProfileValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log("Profile updated:", data);
    // Here you would typically send data to a backend
    alert("Profile updated successfully! (Simulated)");
  }

  const sidebarLinks = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'comparisons', label: 'Saved Comparisons', icon: BarChartHorizontalBig },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];


  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Edit3 className="mr-2 h-5 w-5"/>Edit Profile</CardTitle>
              <CardDescription>Manage your personal information and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={form.watch('avatarUrl') || defaultProfileValues.avatarUrl} alt={form.watch('name')} />
                        <AvatarFallback>{form.watch('name')?.substring(0,2).toUpperCase() || "AU"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-xl font-semibold">{form.watch('name')}</h3>
                        <p className="text-sm text-muted-foreground">{form.watch('email')}</p>
                    </div>
                </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Bio</FormLabel>
                        <FormControl><Input placeholder="Tell us a bit about yourself" {...field} /></FormControl>
                        <FormDescription>Max 160 characters.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar URL</FormLabel>
                        <FormControl><Input placeholder="https://example.com/avatar.png" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid}>
                    <Save className="mr-2 h-4 w-4"/> Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        );
      case 'comparisons':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Saved Comparisons</CardTitle>
              <CardDescription>Access your previously saved data analyses.</CardDescription>
            </CardHeader>
            <CardContent>
              {savedComparisonsData.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Entities</TableHead>
                      <TableHead>Metric</TableHead>
                      <TableHead>Date Saved</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {savedComparisonsData.map((comp) => (
                      <TableRow key={comp.id}>
                        <TableCell className="font-medium">{comp.name}</TableCell>
                        <TableCell>{comp.entities}</TableCell>
                        <TableCell>{comp.metric}</TableCell>
                        <TableCell>{comp.dateSaved}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">You have no saved comparisons yet.</p>
              )}
            </CardContent>
          </Card>
        );
      case 'notifications':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Updates and alerts relevant to your interests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationsData.length > 0 ? notificationsData.map((notif) => (
                <div key={notif.id} className={`p-3 rounded-md border ${notif.read ? 'bg-muted/50' : 'bg-primary/10 border-primary/30'}`}>
                  <p className={`font-medium ${!notif.read ? 'text-primary-foreground' : ''}`}>{notif.message}</p>
                  <p className={`text-xs ${notif.read ? 'text-muted-foreground' : 'text-primary-foreground/80'}`}>{notif.date}</p>
                </div>
              )) : (
                <p className="text-muted-foreground">No new notifications.</p>
              )}
            </CardContent>
          </Card>
        );
        case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences, subscriptions, and security.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for settings, e.g., change password, email preferences */}
              <p className="text-muted-foreground">Account settings options will be available here (e.g., change password, notification preferences, data export).</p>
               <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="font-semibold">Email Preferences</h4>
                    <p className="text-sm text-muted-foreground">Subscribe to newsletters or specific entity updates.</p>
                    {/* Add checkboxes or toggles here */}
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold">Security</h4>
                     <Button variant="outline" className="mt-2">Change Password</Button>
                  </div>
               </div>
            </CardContent>
          </Card>
        );
      default:
        return <p>Select a section</p>;
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="flex-grow md:grid md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]">
        <Sidebar title="User Dashboard" className="hidden md:block">
          <nav className="flex flex-col space-y-1 p-4">
            {sidebarLinks.map(link => (
              <Button
                key={link.id}
                variant={activeSection === link.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection(link.id)}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.label}
              </Button>
            ))}
          </nav>
        </Sidebar>

        <main className="flex-grow p-6 bg-muted/20">
          {/* Mobile: Dropdown or Tabs for sections */}
          <div className="md:hidden mb-4">
            <Select value={activeSection} onValueChange={setActiveSection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {sidebarLinks.map(link => (
                  <SelectItem key={link.id} value={link.id}>
                    <div className="flex items-center">
                      <link.icon className="mr-2 h-4 w-4" />
                      {link.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {renderSection()}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;