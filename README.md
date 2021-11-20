# SOFTWARE ENGINEER TAKE HOME TEST - BACKEND

## Run code in your local

To run code in your local
```bash
git clone https://github.com/immanuel192/shippit-backend-test
# install node on your own
cd shippit-backend-test
npm install

# to run test
npm run test
# to run app similar to how GreekTrust does
npm start --silent ./samples/file1.txt
```

## Assumptions
- Name is unique
- Child should has both father and mother

## Arch
### Storing data
Below is the entity schema for storing data

| Field  | Datatype | Default value            | Description                    | Required |
| ------ | -------- | ------------------------ | ------------------------------ | -------- |
| id     | Text     | Same value with the name | Entity PK                      | Yes      |
| name   | Text     |                          | Person name                    | Yes      |
| gender | Text     |                          | Only accept `Female` or `Male` | Yes      |
| spouse | Text     |                          | Spouse person Id               | No       |
| mother | Text     |                          | Mother id                      | No       |
| father | Text     |                          | Father id                      | No       |

Data is loaded through the [`data`](https://github.com/ShippitRecruitment/backend-challenge_immanuel192/tree/main/src/app/data).

### Data Structure
- Data will be loaded to memory when app starting
- We will build whole family member as a Tree with the structure as bellow
```ts
enum Gender {
  Male = 'Male',
  Female = 'Female'
}

interface FamilyTreeNode {
  id: string
  name: string
  gender: Gender
  spouse?: FamilyTreeNode
  father?: FamilyTreeNode
  mother?: FamilyTreeNode
  children: FamilyTreeNode[]
}
```
- We assume that the first record that we retrieve from the database is always the King Arthur.

### Layers
Below are all the layers in our app
- `geektrust.ts`: entry file
- `app.ts`: the main function of the app. I break it this way to write end-to-end test
- `data`: data access layer. Can be easily changed to use ORM or any data source
- `models`: the domain model of the app, in this case is the Leganburu Family
- `services`: contain all the services and command (ADD_CHILD, GET_RELATIONSHIP), in which excavate information from the domain-models

## Something to highlight
- The name of the Queen is inconsistent. Found `Margret` and `Margaret`. I use `Margret` as in the chart
- The complexity of the algo after the family tree has been builded is O(1)
- All the components in the code are loose-coupling, each of them talk to other using its interface
- A few design patterns have been used: Command, Strategy
- And for datatype: Tree, Map (alternative to indexes in DB)
- This code does not need to be builded before running test, that is a bit different with https://github.com/geektrust/coding-problem-artefacts/tree/master/NodeJS#typescript
