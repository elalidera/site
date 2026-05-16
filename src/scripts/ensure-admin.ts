import { getPayload } from 'payload'
import config from '../../payload.config'

const ensure = async () => {
  const payload = await getPayload({ config })
  const email = 'vander@gmail.com'
  const password = process.env.TEMP_ADMIN_PASSWORD || 'admin123'

  console.log(`Verificando usuário: ${email}...`)

  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
  })

  if (docs.length > 0) {
    console.log('Usuário encontrado, atualizando senha...')
    await payload.update({
      collection: 'users',
      id: docs[0].id,
      data: { password },
    })
    console.log('✅ Senha atualizada com sucesso!')
  } else {
    console.log('Usuário não existe, criando novo admin...')
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
      },
    })
    console.log('✅ Novo administrador criado com sucesso!')
  }

  process.exit(0)
}

ensure()
