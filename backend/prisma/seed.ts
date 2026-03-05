import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando la carga de datos de prueba...');

    // 1. Roles
    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: { name: 'admin' },
    });
    const jefeObraRole = await prisma.role.upsert({
        where: { name: 'jefe_obra' },
        update: {},
        create: { name: 'jefe_obra' },
    });
    const trabajadorRole = await prisma.role.upsert({
        where: { name: 'trabajador' },
        update: {},
        create: { name: 'trabajador' },
    });
    console.log('✅ Roles creados.');

    // 2. Usuarios
    const adminUser = await prisma.user.upsert({
        where: { phone: '+56911112222' },
        update: {},
        create: {
            role_id: adminRole.id,
            full_name: 'Admin Sistema',
            email: 'admin@demo.cl',
            phone: '+56911112222',
        },
    });

    const jefeUser = await prisma.user.upsert({
        where: { phone: '+56933334444' },
        update: {},
        create: {
            role_id: jefeObraRole.id,
            full_name: 'Juan Jefe Obra',
            email: 'jefe@demo.cl',
            phone: '+56933334444',
        },
    });

    const pedroMaestro = await prisma.user.upsert({
        where: { phone: '+56955556666' },
        update: {},
        create: {
            role_id: trabajadorRole.id,
            full_name: 'Pedro Maestro',
            email: 'pedro@demo.cl',
            phone: '+56955556666',
        },
    });

    const mariaMaestra = await prisma.user.upsert({
        where: { phone: '+56977778888' },
        update: {},
        create: {
            role_id: trabajadorRole.id,
            full_name: 'Maria Maestra',
            email: 'maria@demo.cl',
            phone: '+56977778888',
        },
    });
    console.log('✅ Usuarios creados.');

    // 3. Obra
    // Usamos findFirst y creamos solo si no existe
    let obra = await prisma.obra.findFirst({ where: { nombre: 'Obra Piloto SIEL' } });
    if (!obra) {
        obra = await prisma.obra.create({
            data: {
                nombre: 'Obra Piloto SIEL',
                descripcion: 'Construcción inicial de demostración',
                created_by: jefeUser.id,
            },
        });
    }
    console.log('✅ Obra inicial creada.');

    // 4. Partidas (Matriz)
    const partidaExcavacion = await prisma.partida.upsert({
        where: { id: 1 }, // Asumimos IDs bajos para la semilla si es posible, mejor buscar x nombre
        update: {},
        create: {
            nombre: 'Excavación',
            descripcion: 'Excavación manual o con maquinaria',
            precio_base: 50000,
        },
    });

    const partidaEnfierradura = await prisma.partida.upsert({
        where: { id: 2 },
        update: {},
        create: {
            nombre: 'Enfierradura',
            descripcion: 'Armado e instalación de fierro',
            precio_base: 60000,
        },
    });

    const partidaHormigonado = await prisma.partida.upsert({
        where: { id: 3 },
        update: {},
        create: {
            nombre: 'Hormigonado',
            descripcion: 'Vaciado de hormigón',
            precio_base: 70000,
        },
    });
    console.log('✅ Partidas maestras creadas.');

    // 5. Tarea
    let tarea = await prisma.tarea.findFirst({ where: { titulo: 'Excavacion DM-2209' } });
    if (!tarea) {
        tarea = await prisma.tarea.create({
            data: {
                obra_id: obra.id,
                partida_id: partidaExcavacion.id,
                titulo: 'Excavacion DM-2209',
                descripcion: 'Realizar excavación perimetral sector poniente',
                precio_trato: 50000,
                estado: 'asignada',
                created_by: jefeUser.id,
            },
        });
    }
    console.log('✅ Tarea asignada en obra.');

    // 6. Asignación a Pedro Maestro
    let asignacion = await prisma.taskAssignment.findFirst({ where: { task_id: tarea.id, worker_id: pedroMaestro.id } });
    if (!asignacion) {
        asignacion = await prisma.taskAssignment.create({
            data: {
                task_id: tarea.id,
                worker_id: pedroMaestro.id,
                assigned_by: jefeUser.id,
                accepted: false,
            },
        });
    }
    console.log('✅ Tarea vinculada a trabajador Pedro Maestro (Pendiente de aceptar).');

    // 7. Wallet (billeteras de los trabajadores arranca en 0)
    const createWalletIfNotExists = async (userId: number) => {
        const existing = await prisma.wallet.findUnique({ where: { worker_id: userId } });
        if (!existing) {
            await prisma.wallet.create({
                data: {
                    worker_id: userId,
                    saldo_proyectado: 0,
                    saldo_disponible: 0,
                },
            });
        }
    };
    await createWalletIfNotExists(pedroMaestro.id);
    await createWalletIfNotExists(mariaMaestra.id);
    console.log('✅ Wallets de trabajadores inicializados.');

    console.log('🎉 Carga de datos de prueba finalizada exitosamente.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
