# Email Setup Instructions for Eternal Frames Website

## Step 1: Get Your Gmail App Password

1. Go to https://myaccount.google.com (login with eternalframesbymadhu@gmail.com)
2. Click "Security" in the left menu
3. Under "How you sign in to Google", you need "2-Step Verification" enabled
   - If not enabled, click "2-Step Verification" and follow the steps
4. Once 2-Step is enabled, scroll down to find "App passwords"
5. Select "Mail" and "Windows Computer"
6. Google will generate a 16-character password like: `abcd efgh ijkl mnop`
7. Copy this password (without spaces)

## Step 2: Update .env File

1. Open `/Users/madhu/Documents/photography-website/.env`
2. Update the EMAIL_PASSWORD line with the password from Step 1:
   ```
   EMAIL_USER=eternalframesbymadhu@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop
   PORT=3001
   ```
3. Save the file

## Step 3: Start the Servers

Run this command in the project directory:
```bash
npm run dev-full
```

This will start:
- Frontend (Vite): http://localhost:5174
- Backend (Node.js): http://localhost:3001

## Step 4: Test the Contact Form

1. Go to http://localhost:5174/contact
2. Fill out the form
3. Click "Send message"
4. You should receive an email at eternalframesbymadhu@gmail.com
5. The user should also receive a confirmation email

## Troubleshooting

If emails aren't sending:
- Check that 2-Step Verification is enabled on your Google Account
- Verify the app password is correct in .env
- Make sure the backend is running (you should see "Server running on port 3001" in terminal)
- Check browser console for any error messages

## Production Deployment

When deploying to production:
- Add .env to .gitignore (never commit passwords!)
- Use environment variables on your hosting platform
- Test email functionality before going live
