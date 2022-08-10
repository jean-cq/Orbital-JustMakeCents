# JustMakeCents

### Level of achievement: Apollo 11

### Lift-off 🚀
Poster: https://drive.google.com/file/d/1xKcIM_fL_aNwUvlvRGxqvT1w2KhKjYVm/view?usp=sharing

Video: https://www.youtube.com/watch?v=WXnMnJWbBJQ

### Milestone 1
Video: https://youtu.be/t8P1gmou49o

### Milestone 2
Poster: https://drive.google.com/file/d/1A7osd4TZwHlwfLkRGAGpPPVXb2qdAglo/view?usp=sharing

Video: https://youtu.be/7euA97gQx0g

### Milestone 3
Poster: https://drive.google.com/file/d/1DzFjSj6fmMFJITypQypx04ntwSiXnsYc/view?usp=sharing

Video: https://youtu.be/T23AsQgnV1E

### Splash down
Poster: https://drive.google.com/file/d/1y_Sfe7mB-xNirZk2p2IP0UZJqMZmRidr/view?usp=sharing

Video: 

## 💻APK

https://drive.google.com/file/d/1bhYhTnlZhs56T0zafWyiiXzH8U3r-Qr_/view?usp=sharing

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

## ✅Features
1. Authentication (Firebase)
    - Register with email
    - Login with email and password
    - Forget Password
2. Add expenditure page
    - Select categories and date
    - Key in note and amount spent
    - Customised keyboard
3. Profile page
    - Edit Profile to change name and password
    - Display Days recorded, continuing and joined to ensure user retention
    - Bill of current month
    - Daliy saving tips
    - Contact us page to follow our youtube channel, github and email
    - Sign out
4. Expenditure page (with shopping list integrated)
    - Allow users to note down items to purchase
    - Select month to display data
5. Wallet 
    - Edit payment method(can deleted only when expenses, income and balance are 0)
6. Budget
    - Display the percentage of money spent against the budget by a bar
    - Allow users to set their own budget for each category
7. Analytics page
    - Allow users to visualise their expenses(e.g. pie chart and bar plot) by week, by month, by year
8. Lending & Borrowing page
    - Tick if the person returns money or the user returns money
    - Better have an notification if the user has unticked lending and borrowing record

## ❓Problems and Suggestions Araised from Testing
1. Analytics
    - Better UI
    - More analytics charts can be displayed for week
2. Expenditure page
    - Display expenditure in sequences and enable categories selection
3. Profile page
    - Profile photo can be implemented
8. Lending & Borrowing page
    - Cannot sync with month expenditure when unticked
   

## ❓Addressing concerns raised in Milestones
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
- Both of us do not have any prior experience in application development and database implementation

## 📚Tech Stack
- React Native
- Firebase
- Javascript

## 🤩How are we different from similar platforms?
- Shark Money Tracking & Reminder
  - Applications like Shark Money Tracking provide features for users to track their expenses, and reminder applications allow users to record products to be purchased. However, such features are only accessible in separate applications, without an all-in-one application for users to access all features without switching to other apps. 
- Money +
  - The functions in the application cater to the general public. Some of them are complicated but extra to university students and some functions that cater to students are not explicitly implemented. For example, function that records money lent to and borrow from people is not explicitly implemented for users.

## 💻Development Plan
- 3rd week of May: Finalised pitch for Orbital Lift-off
- 4th week of May: Created Mockup
- 5th week of May: Pick up necessary technologies - React, Supabase; and start to build the authentication feature(Login&SignUp Page).
- 1st week of June: Shopping list & page of wallet
- 2nd week of June: Money lending and borrowing & budget
- 3rd week of June: Daily expenses & analysis
- 4th week of June: Testing and debugging (Implement machine learning)
- 1st week of July: Implementation of peer teams’ suggestions
- 2nd week of July - 3rd week of July: Testing and debugging
