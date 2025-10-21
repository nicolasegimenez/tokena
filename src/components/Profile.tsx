import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Profile() {
    return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">U</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet Address</Label>
                <Input id="wallet" placeholder="0x..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" placeholder="Enter your full name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="Enter your country" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Display Name</p>
                  <p className="text-sm text-muted-foreground">Eeriden</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Security</h4>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="password" />
                  <Label htmlFor="password">Change Password</Label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa">Two-Factor Authentication (224)</Label>
                  </div>
                  <Switch id="2fa" defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC/AML Verification */}
        <Card>
          <CardHeader>
            <CardTitle>KYC/AML Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500">Status: Verified</Badge>
            </div>
            
        <div>
              <Button variant="link" className="p-0 h-auto text-blue-600">
                View Details / Documents
              </Button>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button>Save Changes</Button>
              <Button variant="destructive" className="outline">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifications" />
                  <Label htmlFor="notifications">Change Notifications</Label>
                </div>
                <Switch id="notifications-switch" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="email" defaultChecked />
                  <Label htmlFor="email">Email Notifications</Label>
                </div>
                <Switch id="email-switch" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="darkmode" defaultChecked />
                  <Label htmlFor="darkmode">Dark Mode</Label>
                </div>
                <Switch id="darkmode-switch" defaultChecked />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Preferred Currency
              </Button>
              <Button variant="outline" className="flex-1">
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
        </div>
    )
}

export default Profile;