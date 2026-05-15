// src/collections/Users.ts
import type { CollectionConfig } from 'payload'
 
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuário', plural: 'Usuários' },
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Administração',
  },
  access: {
    // Apenas admins podem criar/editar usuários
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
    // Editores podem ver a lista (para o campo "author" nos posts)
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nome completo',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Função',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Apenas admin pode alterar role
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'avatar',
      label: 'Foto de perfil',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      label: 'Mini bio',
      type: 'textarea',
      maxLength: 300,
      admin: {
        description: 'Breve descrição para exibir junto aos artigos (máx 300 caracteres)',
      },
    },
  ],
}
