import { prisma } from './../src/database/db';

async function main() {
    // terms
    await prisma.term.upsert({ where: { number: 1 }, update: {}, create: { number: 1 } })
    await prisma.term.upsert({ where: { number: 2 }, update: {}, create: { number: 2 } })
    await prisma.term.upsert({ where: { number: 3 }, update: {}, create: { number: 3 } })
    await prisma.term.upsert({ where: { number: 4 }, update: {}, create: { number: 4 } })
    await prisma.term.upsert({ where: { number: 5 }, update: {}, create: { number: 5 } })
    await prisma.term.upsert({ where: { number: 6 }, update: {}, create: { number: 6 } })

    // categories
    await prisma.category.upsert({ where: { name: 'Projeto' }, update: {}, create: { name: 'Projeto' } })
    await prisma.category.upsert({ where: { name: 'Pratica' }, update: {}, create: { name: 'Pratica' } })
    await prisma.category.upsert({ where: { name: 'Recuperacao' }, update: {}, create: { name: 'Recuperacao' } })

    // teachers
    await prisma.teacher.upsert({
        where: { name: 'Diego Pinho' }, update: {}, create: {
            name: 'Diego Pinho', categories: {
                connect: [{ name: 'Projeto' }, { name: 'Pratica' }, { name: 'Recuperacao' }]
            }
        }
    })
    await prisma.teacher.upsert({
        where: { name: 'Bruna Hamori' }, update: {}, create: {
            name: 'Bruna Hamori', categories: {
                connect: [{ name: 'Projeto' }, { name: 'Pratica' }, { name: 'Recuperacao' }]
            }
        }
    })

    // disciplines
    await prisma.discipline.upsert({
        where: { name: 'HTML e CSS' },
        update: { termId: 1 },
        create: {
            name: 'HTML e CSS', termId: 1, categories: {
                connect: [{ name: 'Projeto' }, { name: 'Pratica' }, { name: 'Recuperacao' }]
            }
        }
    })
    await prisma.discipline.upsert({
        where: { name: 'JavaScript' },
        update: { termId: 2 },
        create: {
            name: 'JavaScript', termId: 2, categories: {
                connect: [{ name: 'Projeto' }, { name: 'Pratica' }, { name: 'Recuperacao' }]
            }
        }
    })
    await prisma.discipline.upsert({
        where: { name: 'React' },
        update: { termId: 3 },
        create: {
            name: 'React', termId: 3, categories: {
                connect: [{ name: 'Projeto' }, { name: 'Pratica' }, { name: 'Recuperacao' }]
            }
        }
    })
    await prisma.discipline.upsert({
        where: { name: 'Humildade' },
        update: { termId: 1 },
        create: {
            name: 'Humildade', termId: 1, categories: {
                connect: [{ name: 'Projeto' }, { name: 'Pratica' }, { name: 'Recuperacao' }]
            }
        }
    })
    await prisma.discipline.upsert({
        where: { name: 'Planejamento' },
        update: { termId: 2 },
        create: {
            name: 'Planejamento', termId: 2, categories: {
                connect: [{ name: 'Projeto' }, { name: 'Pratica' }, { name: 'Recuperacao' }]
            }
        }
    })
    await prisma.discipline.upsert({
        where: { name: 'Autoconfianca' },
        update: { termId: 3 },
        create: {
            name: 'Autoconfianca', termId: 3, categories: {
                connect: [{ name: 'Projeto' }, { name: 'Pratica' }, { name: 'Recuperacao' }]
            }
        }
    })

    // teachers and disciplines
    await prisma.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 1, disciplineId: 1 } },
        update: { teacherId: 1, disciplineId: 1 },
        create: { teacherId: 1, disciplineId: 1 }
    })
    await prisma.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 1, disciplineId: 2 } },
        update: { teacherId: 1, disciplineId: 2 },
        create: { teacherId: 1, disciplineId: 2 }
    })
    await prisma.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 1, disciplineId: 3 } },
        update: { teacherId: 1, disciplineId: 3 },
        create: { teacherId: 1, disciplineId: 3 }
    })
    await prisma.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 2, disciplineId: 4 } },
        update: { teacherId: 2, disciplineId: 4 },
        create: { teacherId: 2, disciplineId: 4 }
    })
    await prisma.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 2, disciplineId: 5 } },
        update: { teacherId: 2, disciplineId: 5 },
        create: { teacherId: 2, disciplineId: 5 }
    })
    await prisma.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 2, disciplineId: 6 } },
        update: { teacherId: 2, disciplineId: 6 },
        create: { teacherId: 2, disciplineId: 6 }
    })
}

main()
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })