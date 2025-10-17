"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSettings } from "@/contexts/settings-context"
import { Monitor, Moon, Sun, Sidebar, Menu, Save, RotateCcw } from "lucide-react"

export default function SettingsPage() {
  const { theme, navigationStyle, toggleTheme, setNavigationStyle } = useSettings()

  const handleReset = () => {
    setNavigationStyle("sidebar")
    if (theme === "dark") {
      toggleTheme()
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Customize your Boyonas Trucking Service System experience</p>
      </div>

      <div className="grid gap-6">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>Customize the visual appearance of your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Theme</Label>
                <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} aria-label="Toggle dark mode" />
                <Moon className="h-4 w-4" />
              </div>
            </div>

            <Separator />

            {/* Navigation Style */}
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Navigation Style</Label>
                <p className="text-sm text-muted-foreground">Choose how you want to navigate through the system</p>
              </div>
              <RadioGroup
                value={navigationStyle}
                onValueChange={(value) => setNavigationStyle(value as "sidebar" | "horizontal")}
                className="grid grid-cols-1 gap-4"
              >
                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="sidebar" id="sidebar" />
                  <div className="flex items-center space-x-3 flex-1">
                    <Sidebar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="sidebar" className="font-medium cursor-pointer">
                        Sidebar Navigation
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Vertical sidebar with collapsible menu (Recommended)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="horizontal" id="horizontal" />
                  <div className="flex items-center space-x-3 flex-1">
                    <Menu className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="horizontal" className="font-medium cursor-pointer">
                        Horizontal Navigation
                      </Label>
                      <p className="text-sm text-muted-foreground">Traditional top navigation bar</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
            <CardDescription>Configure system-wide preferences and behaviors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Auto-save Forms</Label>
                <p className="text-sm text-muted-foreground">Automatically save form data as you type</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Real-time Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Enable live updates for delivery status and fleet monitoring
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Desktop Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive browser notifications for important updates</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>Manage your data preferences and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Analytics</Label>
                <p className="text-sm text-muted-foreground">Help improve the system by sharing anonymous usage data</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Data Export</Label>
                <p className="text-sm text-muted-foreground">Export your data in various formats</p>
              </div>
              <Button variant="outline" size="sm">
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6">
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 bg-transparent">
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
