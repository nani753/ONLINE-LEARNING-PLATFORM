export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  videoUrl: string;
  quiz: Quiz[];
  featured?: boolean;
}

export const courses: Course[] = [
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Learn the basics of React.js including components, props, state, and hooks.',
    instructor: 'Sarah Johnson',
    duration: '2.5 hours',
    level: 'Beginner',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    featured: true,
    quiz: [
      {
        id: 'q1',
        question: 'What is JSX?',
        options: [
          'A JavaScript extension syntax',
          'A CSS framework',
          'A database query language',
          'A build tool'
        ],
        correctAnswer: 0,
        explanation: 'JSX is a JavaScript extension syntax that allows you to write HTML-like code in JavaScript.'
      },
      {
        id: 'q2',
        question: 'Which hook is used to manage state in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useState is the primary hook for managing state in functional components.'
      },
      {
        id: 'q3',
        question: 'What does the useEffect hook do?',
        options: [
          'Manages component state',
          'Handles side effects',
          'Creates context',
          'Renders components'
        ],
        correctAnswer: 1,
        explanation: 'useEffect handles side effects like API calls, subscriptions, and DOM manipulation.'
      }
    ]
  },
  {
    id: 'javascript-advanced',
    title: 'Advanced JavaScript',
    description: 'Master advanced JavaScript concepts including closures, prototypes, and async programming.',
    instructor: 'Mike Chen',
    duration: '3 hours',
    level: 'Advanced',
    thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    featured: true,
    quiz: [
      {
        id: 'q1',
        question: 'What is a closure in JavaScript?',
        options: [
          'A function that has access to variables in its outer scope',
          'A way to close browser windows',
          'A method to end loops',
          'A type of error handling'
        ],
        correctAnswer: 0,
        explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.'
      },
      {
        id: 'q2',
        question: 'Which of the following is NOT a JavaScript primitive type?',
        options: ['string', 'number', 'object', 'boolean'],
        correctAnswer: 2,
        explanation: 'Object is not a primitive type. The primitive types are: string, number, boolean, undefined, null, symbol, and bigint.'
      }
    ]
  },
  {
    id: 'css-grid-flexbox',
    title: 'CSS Grid & Flexbox',
    description: 'Learn modern CSS layout techniques with Grid and Flexbox.',
    instructor: 'Emma Davis',
    duration: '2 hours',
    level: 'Intermediate',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    quiz: [
      {
        id: 'q1',
        question: 'Which property is used to create a grid container?',
        options: ['display: grid', 'grid-template', 'grid-area', 'grid-column'],
        correctAnswer: 0,
        explanation: 'display: grid creates a grid container and establishes a new grid formatting context.'
      },
      {
        id: 'q2',
        question: 'What does flex-direction: column do?',
        options: [
          'Arranges items horizontally',
          'Arranges items vertically',
          'Centers items',
          'Wraps items'
        ],
        correctAnswer: 1,
        explanation: 'flex-direction: column arranges flex items vertically from top to bottom.'
      }
    ]
  },
  {
    id: 'nodejs-backend',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js and Express.',
    instructor: 'David Rodriguez',
    duration: '4 hours',
    level: 'Intermediate',
    thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    quiz: [
      {
        id: 'q1',
        question: 'What is middleware in Express.js?',
        options: [
          'A database connection',
          'Functions that execute during request-response cycle',
          'A templating engine',
          'A testing framework'
        ],
        correctAnswer: 1,
        explanation: 'Middleware functions are functions that have access to the request object, response object, and the next middleware function in the application\'s request-response cycle.'
      }
    ]
  },
  {
    id: 'python-basics',
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python fundamentals.',
    instructor: 'Lisa Wang',
    duration: '3.5 hours',
    level: 'Beginner',
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    featured: true,
    quiz: [
      {
        id: 'q1',
        question: 'Which of the following is the correct way to create a list in Python?',
        options: [
          'list = [1, 2, 3]',
          'list = (1, 2, 3)',
          'list = {1, 2, 3}',
          'list = <1, 2, 3>'
        ],
        correctAnswer: 0,
        explanation: 'Square brackets [] are used to create lists in Python.'
      }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Principles',
    description: 'Learn essential design principles for creating user-friendly interfaces.',
    instructor: 'Alex Thompson',
    duration: '2.5 hours',
    level: 'Beginner',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    quiz: [
      {
        id: 'q1',
        question: 'What does UX stand for?',
        options: [
          'User Experience',
          'User Extension',
          'Universal Experience',
          'User Execution'
        ],
        correctAnswer: 0,
        explanation: 'UX stands for User Experience, which encompasses all aspects of the end-user\'s interaction with a product.'
      }
    ]
  }
];