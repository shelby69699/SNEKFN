#!/usr/bin/env python3
import subprocess
import sys
import os

def run_command(cmd):
    """Run a command and print its output"""
    print(f"Running: {cmd}")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=os.getcwd())
        if result.stdout:
            print(result.stdout)
        if result.stderr:
            print(f"Error: {result.stderr}")
        return result.returncode == 0
    except Exception as e:
        print(f"Failed to run command: {e}")
        return False

def main():
    print("🚀 EMERGENCY DEPLOYMENT - PUSHING ALL FIXES TO VERCEL")
    print("=" * 60)
    
    # Add all files
    print("\n1. Adding all changes...")
    if not run_command("git add ."):
        print("❌ Failed to add files")
        return
    
    # Commit
    print("\n2. Committing changes...")
    commit_msg = "EMERGENCY: Fix blank page + Terms of Service + Complete DEXY rebrand"
    if not run_command(f'git commit -m "{commit_msg}"'):
        print("⚠️  Nothing to commit or commit failed")
    
    # Push
    print("\n3. Pushing to Vercel...")
    if run_command("git push origin main"):
        print("\n✅ SUCCESS! Deployment pushed to Vercel!")
        print("🌐 Check https://snekfn.vercel.app in 2-3 minutes")
        print("\n📋 Changes deployed:")
        print("   • Fixed blank page (API fallbacks)")
        print("   • Added Terms of Service component")
        print("   • Complete DEXY branding")
        print("   • Static data fallbacks")
    else:
        print("❌ Failed to push to remote")

if __name__ == "__main__":
    main()
    input("\nPress Enter to close...")