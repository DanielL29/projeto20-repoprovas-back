/*
  Warnings:

  - You are about to drop the `_DisciplineToTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DisciplineToTeacher" DROP CONSTRAINT "_DisciplineToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplineToTeacher" DROP CONSTRAINT "_DisciplineToTeacher_B_fkey";

-- DropTable
DROP TABLE "_DisciplineToTeacher";

-- CreateTable
CREATE TABLE "_CategoryToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToTeacher_AB_unique" ON "_CategoryToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToTeacher_B_index" ON "_CategoryToTeacher"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToTeacher" ADD CONSTRAINT "_CategoryToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTeacher" ADD CONSTRAINT "_CategoryToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
