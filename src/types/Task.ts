

export interface Task {
    id: number;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low'; // Specific string literal types
    completed: boolean;
  }
  