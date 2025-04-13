import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const planData = location.state?.plan;
  const { toast } = useToast();

  useEffect(() => {
    setAnimateCard(true);

    if (isLoggedIn && planData) {
      toast({
        title: 'Already logged in',
        description: 'Redirecting to subscription page...',
      });
      setTimeout(() => {
        navigate('/subscribe', { state: { plan: planData } });
      }, 1500);
    } else if (isLoggedIn) {
      toast({
        title: 'Already logged in',
        description: 'Redirecting to homepage...',
      });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [isLoggedIn, planData, navigate]);

  const toggleAuthMode = () => {
    setAnimateCard(false);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setAnimateCard(true);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!email || !password || (!isLogin && !username)) {
      return;
    }

    try {
      const url = `https://live-code-backned.amantiwari7057.workers.dev/api/auth/${isLogin ? 'login' : 'signup'}`;
      const payload = {
        email,
        password,
        ...(isLogin ? {} : { username }),
      };

      const res = await axios.post(url, payload);

      if (res.status === 200 || res.status === 201) {
        const data = res.data;
        console.log("user",data)
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast({
          title: isLogin ? 'Login successful' : 'Account created',
          description: 'Redirecting...',
        });

        setIsLoggedIn(true);

        setTimeout(() => {
          if (planData) {
            navigate('/subscribe', { state: { plan: planData } });
          } else {
            navigate('/');
          }
        }, 1000);
      }
    } catch (err: any) {
      console.error('Auth error:', err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again.';

      toast({
        title: 'Authentication Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 to-background p-4">
      <div
        className={`w-full max-w-md transform transition-all duration-500 ease-out ${
          animateCard ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <Card className="glass-card border border-accent/20 shadow-xl shadow-accent/5">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin
                ? 'Enter your credentials to access your account'
                : 'Enter your information to create an account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="jon123"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`pl-10 ${formSubmitted && !username ? 'border-destructive' : ''}`}
                    />
                    {formSubmitted && !username && (
                      <p className="text-destructive text-sm mt-1">Username is required</p>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${formSubmitted && !email ? 'border-destructive' : ''}`}
                    required
                  />
                  {formSubmitted && !email && (
                    <p className="text-destructive text-sm mt-1">Email is required</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 ${formSubmitted && !password ? 'border-destructive' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {passwordVisible ? '🙈' : '👁️'}
                  </button>
                  {formSubmitted && !password && (
                    <p className="text-destructive text-sm mt-1">Password is required</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full flex items-center justify-center gap-2 group">
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
              <button onClick={toggleAuthMode} className="text-accent hover:underline ml-1">
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
