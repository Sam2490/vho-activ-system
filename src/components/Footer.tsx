import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 pt-8 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary">VHO</span>
            </div>
            <span className="text-sm text-muted-foreground">Volunteer Hub Organization</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Developed by</span>
          <div className="flex items-center gap-1">
            <span className="font-medium">01Developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;