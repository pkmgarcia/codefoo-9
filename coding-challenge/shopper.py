filename = "inventory.csv"
inventory = []

class Item:
  def __init__(self, armorType, name, price, rating):
    self.type = armorType
    self.name = name
    self.price = price
    self.rating = rating

def boundedKnapSack(store, crowns):
  """
  Args:
    store: List of Items
    crowns: Max value

  Returns:
    List of Items that, given a number of crowns, maximizes armor rating (full set of armor + one of any type).
  """
  # Define the base solution
  types = ["Boots", "Helmet", "Leggings", "Chest"]
  filteredStore = []
  for t in types:
    sortedList = list(filter(lambda x: x.type == t, store))
    sortedList.sort(key=lambda x: x.price)
    filteredStore.append(sortedList)

  # Record solutions (entries are list of Item keys)
  numItems = len(store)
  solutions = [[[] for x in range(crowns + 1)] for x in range(numItems)]
  for x in range(numItems):
    typeIndex = x % 5
    for y in range(crowns + 1):
      # For sub problems where only the first set is considered
      if x == 0 or y == 0:
        solutions[x][y] = { }
      # For sub problems where the item can be purchased
      elif int(filteredStore[typeIndex][x // 5].price) <= y:
        withItem = {
          "value": int(store[x - 1].rating) + solutions[x - 1][y - int(store[x - 1].price)]["value"],
          "types": solutions[x - 1][y - int(store[x - 1].price)]["types"].copy()
        }
        withoutItem = solutions[x - 1][y]
        if withItem["value"] > withoutItem["value"]:
          solutions[x][y] = withItem
          solutions[x][y]["types"].append(store[x - 1].type)
        else:
          solutions[x][y] = withoutItem
      # For sub problems where the item cannot be purchased
      else:
        solutions[x][y] = solutions[x - 1][y]
  return solutions

def reconstructKnapSack(store, crowns, solutions):
  """
  Given the solutions to the bounded knapsack problem, this function returns a List of Items in the knapsack.
  
  Args:
    store: List of Items
    solutions: List of Lists where each element is the solution to a sub problem

  Returns:
    A List of Items found in the knapsack.
  """
  index = crowns
  knapsack = []
  for x in range(len(store) - 1, 1, -1):
    if solutions[x][index]["value"] > solutions[x - 1][index]["value"]:
      knapsack.append(store[x - 1])
      index -= int(store[x - 1].price)
  return knapsack

# Populate the store's inventory
store = []
with open(filename, 'r') as file:
  line = file.readline()
  while line is not None and line is not '':
    line = line.split(',')
    store.append(Item(*line))
    line = file.readline()

# Obtain knapsack
solutions = boundedKnapSack(store, 300)
knapsack = reconstructKnapSack(store, 300, solutions)

# Print results
sum = 0
for x in knapsack:
  sum += int(x.price)
  print(x.type, x.name, sum)
