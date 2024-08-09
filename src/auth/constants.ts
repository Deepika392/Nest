import { ConfigModule, ConfigService } from "@nestjs/config";

export const jwtConstants: any = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    signOptions: {
      expiresIn: configService.get("JWT_TOKEN_EXPIRES_IN"),
    },
    secret: configService.get("JWT_SECRET_KEY").replace(/\\n/gm, "\n"),
  }),
  inject: [ConfigService],
};
