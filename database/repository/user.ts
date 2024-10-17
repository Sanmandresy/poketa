import { database } from "database/init";
import { user } from "database/schema";
import { eq } from "drizzle-orm";
import type { Repository, User } from "types";
import { hasKey, objectMapper, randomUuid } from "../../util";

export const userRepository: Repository<User, unknown> = {
	findOne: async (id) => {
		const [entity] = await database.select().from(user).where(eq(user.id, id));
		if (!entity) return null;
		return objectMapper(entity, {} as User);
	},
	findFirst: async () => {
		const [entity] = await database.select().from(user).limit(1);
		if (!entity) return null;
		return objectMapper(entity, {} as User);
	},
	saveOrUpdate: async (users) => {
		return await database.transaction(async (tx) => {
			const savedOrUpdatedUsers: User[] = [];
			for (const restUser of users) {
				if (!hasKey(restUser, "id")) {
					const [saved] = await tx
						.insert(user)
						.values({ ...restUser, id: randomUuid() })
						.returning();
					if (saved) {
						savedOrUpdatedUsers.push(objectMapper(saved, {} as User));
					}
				} else {
					const [updated] = await tx
						.update(user)
						.set(restUser)
						.where(eq(user.id, restUser.id))
						.returning();
					if (updated) {
						savedOrUpdatedUsers.push(objectMapper(updated, {} as User));
					}
				}
			}
			return savedOrUpdatedUsers;
		});
	},
};
