import { useState, useMemo } from 'react';
import { Eye, EyeOff, Lock, X } from 'lucide-react';
import { Label } from './label';
import { Input } from './input';
import { CheckMarkCircle } from '~/assets/icons';
import { Button } from './button';

const PASSWORD_REQUIREMENTS = [
  { regex: /.{12,}/, text: 'At least 12 characters long' },
  { regex: /[a-z]/, text: 'At least one lowercase letter (a-z)' },
  { regex: /[A-Z]/, text: 'At least one uppercase letter (A-Z)' },
  { regex: /[0-9]/, text: 'At least one number (0-9)' },
  { regex: /[^A-Za-z0-9]/, text: 'At least one special character (e.g: !@#$%^&*)' },
  {
    regex: /^((?!password|123456|qwerty).)*$/,
    text: 'Not include dictionary words or common phrases',
  },
  {
    regex: /^(?!.*(.)\1{2,}).*$/,
    text: 'Not contain consecutive repeated characters (e.g. “aaaaaa”)',
  },
  { regex: /^.*$/, text: 'Not match the last 5 passwords used (password history enforced)' }, // Mock check
] as const;

type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const PasswordInput = ({ onSubmit }: { onSubmit: (password: string) => void }) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  const requirements = useMemo(() => {
    return PASSWORD_REQUIREMENTS.map((req) => ({
      met: password.length > 0 && req.regex.test(password),
      text: req.text,
    }));
  }, [password]);

  const score = requirements.filter((req) => req.met).length as StrengthScore;
  const isValid = password === repeatPassword && score === PASSWORD_REQUIREMENTS.length;

  return (
    <div className="space-y-6">
      {/* New Password */}
      <div>
        <Label htmlFor="password" className="mb-1 block text-[16px] font-medium">
          New Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="pl-10 pr-10 h-12 shadow-none"
          />
          <Lock className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-muted-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Repeat Password */}
      <div>
        <Label htmlFor="repeat-password" className="mb-1 block  text-[16px] font-medium">
          Repeat Password
        </Label>
        <div className="relative">
          <Input
            id="repeat-password"
            type={showRepeat ? 'text' : 'password'}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repeat your password"
            className="pl-10 pr-10  h-12 shadow-none"
          />
          <Lock className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
          <button
            type="button"
            onClick={() => setShowRepeat(!showRepeat)}
            className="absolute right-3 top-3.5 text-muted-foreground"
          >
            {showRepeat ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      {repeatPassword && password !== repeatPassword && (
        <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
      )}

      {/* Strength Bar */}
      <div className="flex items-center gap-2 mt-2 mb-4">
        {Array.from({ length: 8 }).map((_, idx) => {
          let barColor = 'bg-gray-200'; // default

          if (score === 8) {
            barColor = 'bg-green-500';
          } else if (score > idx) {
            barColor = 'bg-red-500';
          }

          return <div key={idx} className={`h-1 w-full rounded ${barColor}`} />;
        })}

        {/* Label */}
        <span className="text-sm font-medium ml-2">
          {score === 8 ? 'strong' : score >= 5 ? 'medium' : score > 0 ? 'weak' : ''}
        </span>
      </div>

      {/* Requirements */}
      <ul className="space-y-2 text-sm mt-2">
        {requirements.map((req, i) => (
          <li key={i} className="flex items-start gap-2">
            {req.met ? (
              <CheckMarkCircle
                svgProps={{
                  className: `text-emerald-500 ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`,
                }}
              />
            ) : (
              <X className="text-muted-foreground" size={16} />
            )}
            <span className={req.met ? 'text-emerald-600' : 'text-muted-foreground'}>
              {req.text}
            </span>
          </li>
        ))}
      </ul>

      <Button
        disabled={!isValid}
        type="submit"
        className="w-full cursor-pointer"
        onClick={() => {
          if (isValid) {
            onSubmit(password);
          }
        }}
        // disabled={signin.isPending}
        // loading={signin.isPending}
      >
        Confirm
      </Button>
    </div>
  );
};

export default PasswordInput;
