import { Field, ObjectType } from '@nestjs/graphql';

import { FeatureFlag } from 'src/engine/core-modules/feature-flag/feature-flag.entity';

@ObjectType()
class UserInfo {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}

@ObjectType()
class WorkspaceInfo {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  allowImpersonation: boolean;

  @Field(() => String, { nullable: true })
  logo?: string;

  @Field(() => Number)
  totalUsers: number;

  @Field(() => [UserInfo])
  users: UserInfo[];

  @Field(() => [FeatureFlag])
  featureFlags: FeatureFlag[];
}

@ObjectType()
export class UserLookup {
  @Field(() => UserInfo)
  user: UserInfo;

  @Field(() => [WorkspaceInfo])
  workspaces: WorkspaceInfo[];
}
