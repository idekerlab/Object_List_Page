// Mock data for hypotheses
const mockHypotheses = [
  {
    id: 'Objects_94615c9e-9b47',
    name: 'DNA repair 07.09.2024 - Run 1',
    created: '09.07.2024 16:37:07',
    Objects_text: '## Objects: Dengue virus infection induces DNA damage response',
    reasoning: 'The dataset indicates significant upregulation of DNA repair genes following infection.',
    prediction: 'I predict increased activation of ATM/ATR pathways during infection.',
    experiments: [
      'Measure γH2AX foci formation in infected cells',
      'Assess ATM/ATR phosphorylation status',
      'Evaluate the effect of DNA repair inhibitors on viral replication'
    ],
    alternatives: 'The observed gene expression changes might be a general stress response rather than specific DNA damage.'
  },
  {
    id: 'Objects_c902acb9-97bc',
    name: 'Endothelial Barrier Trial 1 - Run 5',
    created: '09.07.2024 12:55:38',
    Objects_text: '## Knowledge Graph: (STORM1 → activates → NF-κB)',
    reasoning: 'Analysis shows STORM1 activation correlates with NF-κB signaling.',
    prediction: 'STORM1 inhibition should reduce NF-κB activation.',
    experiments: [
      'Test STORM1 inhibitors on NF-κB reporter cells',
      'Measure cytokine production following STORM1 knockdown'
    ]
  },
  {
    id: 'Objects_9d15cffe-c8c9',
    name: 'Endothelial Barrier Trial 1 - Run 4',
    created: '09.07.2024 12:55:25',
    Objects_text: '## Knowledge Graph: 1. (STORM1 → activates → NF-κB)',
    reasoning: 'Multiple datasets confirm STORM1 as an NF-κB pathway activator.',
    prediction: 'STORM1 acts as an upstream regulator in inflammatory signaling.'
  },
  {
    id: 'Objects_128499d6-7073',
    name: 'Endothelial Barrier Trial 1 - Run 3',
    created: '09.07.2024 12:55:21',
    Objects_text: '## Objects: The upregulation of TXNRD2 and IL4I1 during dengue infection',
    reasoning: 'Gene expression data shows consistent upregulation of these targets.',
    prediction: 'These genes likely play a role in the host response to viral infection.'
  },
  {
    id: 'Objects_fd98832c-5da2',
    name: 'Endothelial Barrier Trial 1 - Run 2',
    created: '09.07.2024 12:55:17',
    Objects_text: '**Objects**: Dengue virus manipulates host redox systems',
    reasoning: 'Oxidative stress markers are elevated in patient samples.',
    prediction: 'Antioxidant treatment may reduce viral replication.'
  },
  {
    id: 'Objects_cc8b2653-6f15',
    name: 'Endothelial Barrier Trial 1 - Run 1',
    created: '09.07.2024 12:55:05',
    Objects_text: '**Objects**: The downregulation of tight junction proteins during infection',
    reasoning: 'Microscopy shows disrupted cell-cell contacts in infected cultures.',
    prediction: 'This may contribute to vascular leakage in severe dengue.'
  },
  {
    id: 'Objects_d155e348-a684',
    name: 'Endothelial Barrier Trial 1 - Run 0',
    created: '09.07.2024 12:55:00',
    Objects_text: '## Objects: Dengue virus NS1 protein directly damages endothelial barriers',
    reasoning: 'NS1 protein levels correlate with disease severity in patients.',
    prediction: 'NS1 binding to endothelial cells triggers barrier dysfunction.'
  },
  {
    id: 'Objects_b5b1af45-3430',
    name: 'Urea cycle Trial 1 - Run 4',
    created: '08.27.2024 15:43:10',
    Objects_text: '## Knowledge Graph: (IREB2 → inhibits → Ferritin)',
    reasoning: 'Iron regulatory proteins control ferritin translation.',
    prediction: 'IREB2 knockdown should increase ferritin levels.'
  },
  {
    id: 'Objects_740bca2a-e6a8',
    name: 'Urea cycle Trial 1 - Run 3',
    created: '08.27.2024 15:42:58',
    Objects_text: '## Knowledge Graph: 1. (Dengue virus → upregulates → TXNRD2)',
    reasoning: 'Viral infection appears to modulate redox systems.',
    prediction: 'This may be a viral strategy to create favorable replication conditions.'
  },
  {
    id: 'Objects_88bcf142-43d6',
    name: 'Urea cycle Trial 1 - Run 2',
    created: '08.27.2024 15:42:51',
    Objects_text: '## Objects: Dengue virus infection induces a significant upregulation of TXNRD2 and IL4I1, which are involved in oxidative stress response and immune modulation, respectively. This upregulation is hypothesized to be mediated through the activation of NF-κB signaling, resulting in increased expression of these genes, which in turn may promote viral replication and enhance the inflammatory response.',
    reasoning: 'The dataset indicates that TXNRD2 is upregulated in response to siRNA knockdown, suggesting its role in the viral lifecycle or host response to infection. Previous studies have shown that TXNRD2 is involved in maintaining redox balance and may be upregulated in response to oxidative stress, which is a common consequence of viral infection. Additionally, IL4I1, known for its role in immune modulation and tryptophan metabolism, could also be expected to show an increase in expression during dengue virus infection to regulate the inflammatory response and promote viral survival.',
    prediction: 'In the larger dataset, both TXNRD2 and IL4I1 will show significant upregulation post-dengue virus infection, which may not be captured in this subset. Specifically, I would expect a log2FC of greater than 1 for both proteins following infection, reflecting their roles in the host\'s adaptive response to the virus.',
    experiments: [
      'Quantitative PCR and Western blot analyses to measure the expression levels of TXNRD2 and IL4I1 following dengue virus infection in various cell lines.',
      'Inhibition of NF-κB signaling using specific inhibitors to see if TXNRD2 and IL4I1 expression decreases, thus establishing a causal link.',
      'Assessment of viral load in cells with and without TXNRD2 and IL4I1 knockdown to evaluate their roles in viral replication.'
    ],
    alternatives: 'Alternative outcomes could include the failure to observe significant changes in TXNRD2 or IL4I1 expression following infection, which would suggest that their regulation is not directly tied to dengue virus infection or that the regulatory mechanisms are more complex than hypothesized.'
  },
  {
    id: 'Objects_80d63b20-debc',
    name: 'Urea cycle Trial 1 - Run 1',
    created: '08.27.2024 15:42:45',
    Objects_text: 'Here is my attempt at developing a Objects based on the data.',
    reasoning: 'The data shows patterns that suggest a relationship between viral infection and metabolic changes.',
    prediction: 'Further experiments should reveal more specific mechanisms.'
  },
  {
    id: 'Objects_086c3494-8det',
    name: 'Urea cycle Trial 1 - Run 0',
    created: '08.27.2024 15:42:33',
    Objects_text: '**Objects**: Proteins involved in the urea cycle are downregulated during infection',
    reasoning: 'Metabolomic data shows altered nitrogen metabolism in infected cells.',
    prediction: 'This may represent a viral strategy to redirect nitrogen resources.'
  }
];


export const fetchObjects = async (
  page = 1, 
  pageSize = 10, 
  searchQuery = '',
  searchType = 'quick'
) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredHypotheses = [...mockHypotheses];
  
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    
    // Different search strategies based on searchType
    if (searchType === 'sql') {
      // This would be a more complex SQL-like search in a real app
      // For now, just do the same as quick search
      filteredHypotheses = filteredHypotheses.filter(h => 
        h.name.toLowerCase().includes(lowerQuery) || 
        h.Objects_text.toLowerCase().includes(lowerQuery) ||
        h.id.toLowerCase().includes(lowerQuery)
      );
    } else {
      // Default quick search
      filteredHypotheses = filteredHypotheses.filter(h => 
        h.name.toLowerCase().includes(lowerQuery) || 
        h.Objects_text.toLowerCase().includes(lowerQuery) ||
        h.id.toLowerCase().includes(lowerQuery)
      );
    }
  }
  
  // Calculate pagination
  const totalItems = filteredHypotheses.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedHypotheses = filteredHypotheses.slice(startIndex, endIndex);
  
  return {
    hypotheses: paginatedHypotheses,
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages
    }
  };
};

// Function to get a single Objects by ID
export const getObjectsById = async (id: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockHypotheses.find(h => h.id === id) || null;
};

// Function to create a new Objects (mock implementation)
export const createObjects = async (Objects: any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newObjects = {
    id: `Objects_${Math.random().toString(36).substr(2, 9)}`,
    created: new Date().toLocaleString(),
    ...Objects
  };
  
  // In a real implementation, this would add to the database
  // For this mock, we'll just return the new Objects
  return newObjects;
};

export const deleteObjects = async (id: string) => {
  // In a real application, this would be an API call
  // For now, we'll just simulate a successful deletion
  return new Promise<void>((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      console.log(`Object with ID ${id} deleted`);
      resolve();
    }, 500);
  });
};
