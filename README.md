# bootmine-front-end-assignment

Note taking SPA made with React with persistent storage.

### Main requirements / Features
```diff
+ Add notes
+ Show notes
+ Edit notes
+ Delete notes
+ Store notes
+ Built with React
+ Used git for version control
+ Comprehensive commit messages
+ Creating own mobile/tablet design and implementation
```

### Bonus requirements
```diff
+ Built with pre-processor (Webpack)
+ Use SASS/SCSS or Tailwind (Tailwind)
+ Usage of a database (PouchDB)
+ Pointing out weaknessess in UX/UI (Read further)
! Usage of typescript
! Unit tests
```

## UX/UI Feedback
  Per instructions, I followed the design closely and had to force myself not to implement certain UX features.
  Here is a list of things that I think could be improved.
### Concerns / Opinions
1. The application is bound to max 3 column design.
    * Users with larger screen size would certainly want to  control the amount of columns/cards visible on their screen.
    * Possibly a good idea would be to abandon column design and allow users to freely place notes anywhere in given space/canvas.
2. User has to scroll all the way down in order to create a new card.
    * Solution for that would be a component with a fixed position that folds and unfolds whenever user wants to create a new card.
3. Cards aren't reorderable.
    * Not having this crucial feature turns organizing app into a shopping list app. Any user would prefer to change the position of created cards.
4. Cards can't change color.
    * The main feature of using notes is the fact that they often are different colored. The purpose of different colors is that people can easier remember color-coded notes. Having the option to color-code notes is absolutely vital for a note taking app.

### Smaller concerns
1. Placement of delete action
    * Personally, over the years I adjusted to having a delete icon near the edge.
