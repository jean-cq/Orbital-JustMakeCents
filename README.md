# JustMakeCents
Mock ups and technical proof are shown as our video (for Milestone 2): https://youtu.be/7euA97gQx0g

## 💡Motivation

Have you ever felt confused about where you spend your money when you see your banking statements? The categories shown in your Digibank may be too vague and general, and you may lose track of your daily expenses.

Before shopping, many may have a shopping list in mind, yet they may still forget certain items without noting them down. Also, they may end up spending more than expected. Despite planning ahead, they may not match the long-term budget with their day-to-day spending. When their budgets are too unrealistic, and may need general advice on adjusting them to suitable levels.

Many may have reached the point where they need to lend or borrow money from their friends but forget about these afterwards. 
Therefore, they need an all-in-one application to keep track of their daily expenses, shopping list, budget, and lending and borrowing money from others.

## 🎯Aim

We hope to make consumption patterns more visible, accessible and informative to help students make more informed financial decisions through an all-in-one mobile money manager application.

## 🧐User Stories

As a student who wants to manage my finances, I want to keep track of my daily expenses and visualise a detailed version of my consumption patterns.

As a student living in hostels who needs to shop on their own, I want to make a clear and exhaustive shopping list.

As a student who cannot plan well on how much to spend, I want to set a reasonable budget and get timely updates on money spent against the budget and remaining budget for the rest of the week. 

As a student who tends to forget to return money, I want to be reminded of money I have lent or borrowed from my friends.

## 🔭Scope of Project
The mobile application provides a money manager interface for students to keep track of their daily expenses, shopping list, budget, and money lending and borrowing from others.

## ✅Features already completed
1. Authentication (Firebase)
    - Register with email
    - Login with email and password
2. Add expenditure page
    - Select categories and date
    - Key in note and amount spent
    - Customised keyboard
3. Profile page
    - Sign out
4. Expenditure page (with shopping list integrated)
    - Allow users to note down items to purchase
5. Wallet 
    - Edit payment method
6. Budget
    - Display the percentage of money spent against the budget 
    - Allow users to set their own budget for each category
7. UI completed except for Analytics page

## 🧭Features to be completed by the mid of July
1. Analytics page
    - Allow users to visualise their daily expenses(e.g. pie chart and bar plot)
2. Budget
    - Provide recommendations on adjustments to the budget with machine learning(if possible)
3. Shopping list
    - Provide recommendations on how much and how frequent certain products should be purchased with machine learning
4. Notification
    - Remind users of returning the money to friends and banks
5. Profile
    - Settings and badge collection

## ❓Addressing concerns raised in Milestone 1
- Incentives consistently motivate users
  - Badge system
  - Display days continuing/days enjoyed/days recorded
- Too many categories
  - To be addressed in Analytics
  - Graphs like pie charts only show top 3 or 4 categories
- Credit card in wallet - users not willing to manually key in
  - Payment methods are optional in new entries
  - No detailed info of credit cards needed to be entered
- Name of categories - “book” “wallet” not clear
  - Change book to “expenditures”
- Duplicated function of Shopping list
  - Merge shopping lists into Expenditure(‘Book’ in original)
  - Show "Show Completed Purchases", "Show Incomplete Purchases” through checkboxes

## 😣Problems faced and solutions
- Database
  - Unable to operate with Supabase → Changed to Firebase
  - Different versions have different syntax → Consulted various sources for v9 syntax
  - Realtime database keeps updating → Changed to Firestore database
- Different locations, unable to physically meet up → Google Meet & Github
- Minor difficulties: navigation problem, use of hooks and components, UI layout implemented by jsx and many random errors…
- Lesson learnt: make full use of online resources including npmjs, youtube and stackoverflow and documentations of tech stacks 

## 📚Tech Stack
- React Native
- Firebase
- Javascript

## 🤩How are we different from similar platforms?
- Shark Money Tracking & Reminder
  - Applications like Shark Money Tracking provide features for users to track their expenses, and reminder applications allow users to record products to be purchased. However, such features are only accessible in separate applications, without an all-in-one application for users to access all features without switching to other apps. 
- Money +
  - The functions in the application cater to the general public. Some of them are complicated but extra to university students.

## 💻Development Plan
- 3rd week of May: Finalised pitch for Orbital Lift-off
- 4th week of May: Created Mockup
- 5th week of May: Pick up necessary technologies - React, Supabase; and start to build the authentication feature(Login&SignUp Page).
- 1st week of June: Shopping list & page of wallet
- 2nd week of June: Money lending and borrowing & budget
- 3rd week of June: Daily expenses & analysis
- 4th week of June: Testing and debugging (Implement machine learning)
- 1st week of July: Implementation of peer teams’ suggestions
- 2nd week of July: 3rd week of July: Testing and debugging
