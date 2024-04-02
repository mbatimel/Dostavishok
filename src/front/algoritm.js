  // Функция для поиска кратчайших путей от стартовой вершины
  function bellmanFord(edges, startVertex) {
    const distances = {};
    const previousVertices = {};
    
  
    // Инициализация расстояний и предыдущих вершинами
    distances[startVertex] = 0;
    previousVertices[startVertex] = null;
  
    // Релаксация ребер
    for (let i = 1; i < Object.keys(edges).length; i++) {
      edges.forEach(edge => {
        const { source, target, weight } = edge;
        if (distances[source] !== undefined && (distances[target] === undefined || distances[source] + weight < distances[target])) {
          distances[target] = distances[source] + weight;
          previousVertices[target] = source;
        }
      });
    }
  
    // Проверка наличия отрицательных циклов
    edges.forEach(edge => {
      const { source, target, weight } = edge;
      if (distances[source] + weight < distances[target]) {
        throw new Error('Граф содержит отрицательные циклы');
      }
    });
  
    return { distances, previousVertices };
  }
  
  // Пример использования
  function shurtway(){
    const edges = [
      { source: 0, target: 1, weight: parseInt(graphmass[0]) },
      { source: 0, target: 2, weight: parseInt(graphmass[1]) },
      { source: 0, target: 3, weight: parseInt(graphmass[2]) },
      { source: 0, target: 4, weight: parseInt(graphmass[3]) },
      { source: 0, target: 5, weight: parseInt(graphmass[4]) },
      { source: 0, target: 6, weight: parseInt(graphmass[5]) },
      { source: 0, target: 7, weight: parseInt(graphmass[6]) },
      { source: 1, target: 2, weight: parseInt(graphmass[7]) },
      { source: 1, target: 3, weight: parseInt(graphmass[8]) },
      { source: 1, target: 4, weight: parseInt(graphmass[9]) },
      { source: 1, target: 5, weight: parseInt(graphmass[10]) },
      { source: 1, target: 6, weight: parseInt(graphmass[11]) },
      { source: 1, target: 7, weight: parseInt(graphmass[12]) },
      { source: 2, target: 3, weight: parseInt(graphmass[13]) },
      { source: 2, target: 4, weight: parseInt(graphmass[14]) },
      { source: 2, target: 5, weight: parseInt(graphmass[15]) },
      { source: 2, target: 6, weight: parseInt(graphmass[16]) },
      { source: 2, target: 7, weight: parseInt(graphmass[17]) },
      { source: 3, target: 4, weight: parseInt(graphmass[18]) },
      { source: 3, target: 5, weight: parseInt(graphmass[19]) },
      { source: 3, target: 6, weight: parseInt(graphmass[20]) },
      { source: 3, target: 7, weight: parseInt(graphmass[21]) },
      { source: 4, target: 5, weight: parseInt(graphmass[22]) },
      { source: 4, target: 6, weight: parseInt(graphmass[23]) },
      { source: 4, target: 7, weight: parseInt(graphmass[24]) },
      { source: 5, target: 6, weight: parseInt(graphmass[25]) },
      { source: 5, target: 7, weight: parseInt(graphmass[26]) },
      { source: 6, target: 7, weight: parseInt(graphmass[28]) }
  
  
      
    ];
    
  const startVertex = 0;
  const { distances, previousVertices } = bellmanFord(edges, startVertex);
  
  console.log('Кратчайшие расстояния:');
  console.log(distances);
  console.log('Предыдущие вершины:');
  console.log(previousVertices);
  }
  export { shurtway };
  