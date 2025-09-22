import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { validateEmail, validatePassword, validatePhoneNumber, sanitizeInput, validateCompanyName } from "@/lib/validation";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();

  // Sign up state
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    userRole: "company_rep" as "company_rep",
    companyName: "",
    phoneNumber: ""
  });
  const [signUpLoading, setSignUpLoading] = useState(false);

  // Sign in state
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });
  const [signInLoading, setSignInLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] }>({});

  const validateSignUpForm = (): boolean => {
    const errors: { [key: string]: string[] } = {};

    // Validate email
    if (!validateEmail(signUpData.email)) {
      errors.email = ['Please enter a valid email address'];
    }

    // Validate password
    const passwordValidation = validatePassword(signUpData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors;
    }

    // Validate password confirmation
    if (signUpData.password !== signUpData.confirmPassword) {
      errors.confirmPassword = ['Passwords do not match'];
    }

    // Validate required fields
    if (!signUpData.firstName.trim()) {
      errors.firstName = ['First name is required'];
    }

    if (!signUpData.lastName.trim()) {
      errors.lastName = ['Last name is required'];
    }

    // Validate phone number if provided
    if (signUpData.phoneNumber && !validatePhoneNumber(signUpData.phoneNumber)) {
      errors.phoneNumber = ['Please enter a valid phone number (e.g., +1 555-123-4567)'];
    }

    // Validate company name (always required)
    if (!validateCompanyName(signUpData.companyName)) {
      errors.companyName = ['Company name must be between 2 and 100 characters'];
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Sign up form data:', signUpData);
    
    if (!validateSignUpForm()) {
      console.log('Form validation failed');
      return;
    }

    setSignUpLoading(true);
    
    const metadata = {
      first_name: sanitizeInput(signUpData.firstName),
      last_name: sanitizeInput(signUpData.lastName),
      user_role: signUpData.userRole,
      company_name: sanitizeInput(signUpData.companyName),
      phone_number: signUpData.phoneNumber || null
    };

    console.log('Sign up metadata:', metadata);

    const { error } = await signUp(signUpData.email, signUpData.password, metadata);
    
    setSignUpLoading(false);

    if (error) {
      console.error('Sign up error:', error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message
      });
    } else {
      console.log('Sign up successful');
      toast({
        title: "Success!",
        description: "Please check your email to verify your account"
      });
      onOpenChange(false);
      resetForm();
    }
  };

  const validateSignInForm = (): boolean => {
    const errors: { [key: string]: string[] } = {};

    if (!validateEmail(signInData.email)) {
      errors.email = ['Please enter a valid email address'];
    }

    if (!signInData.password) {
      errors.password = ['Password is required'];
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignInForm()) {
      return;
    }

    setSignInLoading(true);

    const { error } = await signIn(signInData.email, signInData.password);
    
    setSignInLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in"
      });
      onOpenChange(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setSignUpData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      userRole: "company_rep",
      companyName: "",
      phoneNumber: ""
    });
    setSignInData({
      email: "",
      password: ""
    });
    setValidationErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetForm();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to NCHG Ti64 Marketplace</DialogTitle>
          <DialogDescription>
            Join our Ti64 powder marketplace community
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signInData.email}
                  onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                {validationErrors.email && (
                  <div className="text-sm text-destructive">
                    {validationErrors.email.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={signInData.password}
                  onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
                {validationErrors.password && (
                  <div className="text-sm text-destructive">
                    {validationErrors.password.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={signInLoading}>
                {signInLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Sign In
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={signUpData.firstName}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                  {validationErrors.firstName && (
                    <div className="text-sm text-destructive">
                      {validationErrors.firstName.map((error, index) => (
                        <div key={index}>{error}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={signUpData.lastName}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                  {validationErrors.lastName && (
                    <div className="text-sm text-destructive">
                      {validationErrors.lastName.map((error, index) => (
                        <div key={index}>{error}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                {validationErrors.email && (
                  <div className="text-sm text-destructive">
                    {validationErrors.email.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={signUpData.phoneNumber}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                />
                {validationErrors.phoneNumber && (
                  <div className="text-sm text-destructive">
                    {validationErrors.phoneNumber.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={signUpData.companyName}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, companyName: e.target.value }))}
                  required
                />
                {validationErrors.companyName && (
                  <div className="text-sm text-destructive">
                    {validationErrors.companyName.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a secure password (12+ chars, mixed case, numbers, symbols)"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
                {validationErrors.password && (
                  <div className="text-sm text-destructive">
                    {validationErrors.password.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
                {validationErrors.confirmPassword && (
                  <div className="text-sm text-destructive">
                    {validationErrors.confirmPassword.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={signUpLoading}>
                {signUpLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};