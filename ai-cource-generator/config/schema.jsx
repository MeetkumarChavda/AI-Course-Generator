import { pgTable, serial, json, varchar } from 'drizzle-orm/pg-core';


export const CourseList = pgTable('courseList', {
    id:serial('id').primaryKey(),
    courseId:varchar('courseId', { length: 255 }).notNull(),
    name:varchar('name').notNull(),
    category:varchar('category').notNull(),
    level:varchar('level').notNull(),
    courseOutput:json('courseOutput').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('userName'),
    userProfileImage:varchar('userProfileImage')
})