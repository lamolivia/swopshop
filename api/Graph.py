from itertools import product
from math import prod

class Process:
	NOT_PROCESSED = 0
	UNDER_PROCESSING = 1
	PROCESSED = 2

class Graph:

	def __init__(self, db):
		self.db = db

		self.result = []
		self.visited = {}
		self.initial_product_id = ""

	def contains_cycle(self, product_id):
		self.result = []
		self.visited = {}
		self.initial_product_id = product_id

		self._dfs(product_id=product_id)
		return self.result

	def _dfs(self, product_id):
		print(f"dfs with id {product_id}")
		visited = self.visited.get(product_id, Process.NOT_PROCESSED)
		if visited == Process.UNDER_PROCESSING:
			print(f"exiting id {product_id}")
			if self.initial_product_id == product_id:
				return True
			return False
		if visited == Process.PROCESSED:
			print(f"exiting id {product_id}")
			return False

		# mark as under processing
		self.visited[product_id] = Process.UNDER_PROCESSING
		self.result.append(product_id)
		for n in self._neighbours(product_id=product_id):
			if self._dfs(product_id=n):
				print(f"exiting id {product_id}")
				return True

		# mark as processed	
		self.visited[product_id] = Process.PROCESSED
		self.result.pop()
		print(f"exiting id {product_id}")
		return False

	def _get_user(self, product_id: str):

		products = self.db.collection('product').document(product_id)
		products = products.get()
		if not products.exists:
			return []

		products = products.to_dict()
		user_id = products.get('user_id')

		user = self.db.collection('users').document(user_id)
		return user

	def _neighbours(self, product_id: str):

		user = self._get_user(product_id=product_id)
		user = user.get()

		if not user.exists:
			return []

		user = user.to_dict()		
		return user.get('want', [])

	def destory_cycle(self, path):
		if len(path) <= 1:
			return
		path = path.copy()
		path.append(path[0])
		self.destroy_path(path)


	def destroy_path(self, path):

		if len(path) <= 1:
			return

		prod_id = path[0]
		prod_id_to_delete = path[1]

		# get the user of the current node
		user = self._get_user(product_id=prod_id)
		user_data = user.get()

		if not user_data.exists:
			return

		user_data = user_data.to_dict()		
		wants = user_data.get('want', [])

		wants.remove(prod_id_to_delete)
		user.update({"want" : wants})

		self.destroy_path(path[1:])





	