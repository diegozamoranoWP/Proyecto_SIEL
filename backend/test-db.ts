import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔎 Verificando la conexión a PostgreSQL...');

    const users = await prisma.user.findMany({
        include: { role: true },
    });
    console.log(`✅ Se encontraron ${users.length} usuarios.`);
    console.log(users.map((u) => `- ${u.full_name} (${u.role.name})`).join('\n'));

    const tareas = await prisma.tarea.findMany({
        include: {
            obra: true,
            partida: true,
        },
    });
    console.log(`\n✅ Se encontraron ${tareas.length} tareas.`);
    console.log(
        tareas
            .map(
                (t) =>
                    `- ${t.titulo} en '${t.obra.nombre}' (Partida: ${t.partida.nombre}) -> Estado: ${t.estado}`
            )
            .join('\n')
    );

    const wallets = await prisma.wallet.findMany({
        include: { worker: true },
    });
    console.log(`\n✅ Se encontraron ${wallets.length} wallets activas.`);
    console.log(
        wallets
            .map((w) => `- Worker: ${w.worker.full_name} | Saldo Disponible: $${w.saldo_disponible}`)
            .join('\n')
    );

    console.log('\n🎉 ¡La base de datos PostgreSQL está respondiendo perfectamente!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Error general al consultar:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
