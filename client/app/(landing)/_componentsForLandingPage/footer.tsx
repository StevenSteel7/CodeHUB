import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About CodeHUB</h3>
              <p className="text-muted-foreground">
                Your personal coding notes companion. Remember more, learn faster with our intuitive note-taking platform.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-primary">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t">
            <p className="text-center text-muted-foreground">
              © {new Date().getFullYear()} CodeHUB. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}