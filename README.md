# Passenger Reward System

## Installation and Setup

1. **Clone the repository to your local machine**:
   ```sh
   git clone https://github.com/Omolounnu-Oluwafemi/Passenger-reward-Clientside
   ```

2. **Navigate to the project directory in your terminal**:
   ```sh
   cd Passenger-reward-Clientside
   ```

3. **Install all the dependencies listed in the `package.json` file**:
   ```sh
   yarn install
   ```

4. **Start the development server**:
   ```sh
   yarn dev
   ```

## Dashboard

- Upon opening the application, you will be directed to the **Dashboard**.
- The Dashboard provides a summary of:
  - Your total earnings
  - Cash back
  - Miles points
  - Total distance travelled
- At the bottom of the Dashboard, you can view all your trips in a table format.

## Transactions

- If there are no transactions found for your user, a modal will appear with a message directing you to navigate to the **New Trip** page to start claiming your rewards.
- Click the "OK" button on the modal to be redirected to the **New Transaction** page.

## New Transaction Page

- On this page, you can enter the details of your new trip to claim your rewards.
- After entering the details, submit the form to add the transaction to your account.
- You will then be redirected back to the Dashboard where you can view your updated rewards.

## Error Handling

- If there's an error while fetching transactions, the error message will be logged to the console.

## Live Version

The live version of the aoo is hosted at `https://passenger-reward-clientside.vercel.app`
