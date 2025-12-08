// Footer component

import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-lavender flex items-center justify-center">
                <span className="text-xl">🌙</span>
              </div>
              <span className="text-xl font-bold text-gradient">Luna</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted companion for menstrual health education, cycle tracking, and reproductive wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tracker" className="text-muted-foreground hover:text-foreground transition-colors">
                  Period Tracker
                </Link>
              </li>
              <li>
                <Link to="/hygiene" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hygiene Guide
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ask Luna
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/learn#myths" className="text-muted-foreground hover:text-foreground transition-colors">
                  Myths vs Facts
                </Link>
              </li>
              <li>
                <Link to="/learn#pcos" className="text-muted-foreground hover:text-foreground transition-colors">
                  PCOS Awareness
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Your Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Privacy First</h4>
            <p className="text-sm text-muted-foreground mb-4">
              All data is stored locally on your device. We never collect or share your personal health information.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-coral-light transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-lavender-light transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-mint-light transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Luna. Made with <Heart className="w-4 h-4 inline text-coral" /> for menstrual health awareness.</p>
          <p className="text-xs">
            Disclaimer: This app provides general information only. Always consult a healthcare professional for medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
