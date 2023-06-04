def bellman_ford(graph, start):
    # Шаг 1: Инициализация расстояний до всех вершин
    distances = {vertex: float('inf') for vertex in graph}
    distances[start] = 0

    # Шаг 2: Релаксация ребер
    for _ in range(len(graph) - 1):
        for vertex in graph:
            for neighbor, weight in graph[vertex].items():
                if distances[vertex] + weight < distances[neighbor]:
                    distances[neighbor] = distances[vertex] + weight

    # Шаг 3: Проверка наличия циклов отрицательного веса
    for vertex in graph:
        for neighbor, weight in graph[vertex].items():
            if distances[vertex] + weight < distances[neighbor]:
                raise ValueError("Граф содержит циклы отрицательного веса")

    return distances
# Пример графа
graph = {
    'A': {'B': -1, 'C': 4},
    'B': {'C': 3, 'D': 2, 'E': 2},
    'C': {},
    'D': {'B': 1, 'C': 5},
    'E': {'D': -3}
}

start_vertex = 'A'
distances = bellman_ford(graph, start_vertex)

print("Расстояния от вершины", start_vertex)
for vertex, distance in distances.items():
    print(f"Вершина {vertex}: Расстояние {distance}")
