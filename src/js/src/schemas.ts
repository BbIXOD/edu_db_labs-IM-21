import exp from "constants"

export const addNewCategory = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      postId: { type: 'string' }
    },
    required: ['name', 'description', 'postId']
  }
}

export const extendCategory = {
  body: {
    type: 'object',
    properties: {
      postId: { type: 'string' },
      categoryId: { type: 'string' }
    },
    required: ['postId', 'categoryId']
  }
}

export const withId = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  }
}

export const modifyCategory = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' }
    },
    required: ['name', 'description']
  }
}