CREATE DATABASE FileStorage;
GO

USE FileStorage;
GO

IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] NVARCHAR(150) NOT NULL,
        [ProductVersion] NVARCHAR(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])     
    );

    CREATE TABLE [AspNetRoles] (
        [Id] NVARCHAR(450) NOT NULL,
        [Name] NVARCHAR(256) NULL,
        [NormalizedName] NVARCHAR(256) NULL,
        [ConcurrencyStamp] NVARCHAR(MAX) NULL,
        CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
    );

    CREATE TABLE [AspNetUsers] (
        [Id] NVARCHAR(450) NOT NULL,
        [UserName] NVARCHAR(256) NULL,
        [NormalizedUserName] NVARCHAR(256) NULL,
        [Email] NVARCHAR(256) NULL,
        [NormalizedEmail] NVARCHAR(256) NULL,
        [EmailConfirmed] BIT NOT NULL,
        [PasswordHash] NVARCHAR(MAX) NULL,
        [SecurityStamp] NVARCHAR(MAX) NULL,
        [ConcurrencyStamp] NVARCHAR(MAX) NULL,
        [PhoneNumber] NVARCHAR(MAX) NULL,
        [PhoneNumberConfirmed] BIT NOT NULL,
        [TwoFactorEnabled] BIT NOT NULL,
        [LockoutEnd] DATETIMEOFFSET NULL,
        [LockoutEnabled] BIT NOT NULL,
        [AccessFailedCount] INT NOT NULL,
        CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
    );

    CREATE TABLE [AspNetRoleClaims] (
        [Id] INT NOT NULL IDENTITY,
        [RoleId] NVARCHAR(450) NOT NULL,
        [ClaimType] NVARCHAR(MAX) NULL,
        [ClaimValue] NVARCHAR(MAX) NULL,
        CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE
    );

    CREATE TABLE [AspNetUserClaims] (
        [Id] INT NOT NULL IDENTITY,
        [UserId] NVARCHAR(450) NOT NULL,
        [ClaimType] NVARCHAR(MAX) NULL,
        [ClaimValue] NVARCHAR(MAX) NULL,
        CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );

    CREATE TABLE [AspNetUserLogins] (
        [LoginProvider] NVARCHAR(450) NOT NULL,
        [ProviderKey] NVARCHAR(450) NOT NULL,
        [ProviderDisplayName] NVARCHAR(MAX) NULL,
        [UserId] NVARCHAR(450) NOT NULL,
        CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
        CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );

    CREATE TABLE [AspNetUserRoles] (
        [UserId] NVARCHAR(450) NOT NULL,
        [RoleId] NVARCHAR(450) NOT NULL,
        CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
        CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );

    CREATE TABLE [AspNetUserTokens] (
        [UserId] NVARCHAR(450) NOT NULL,
        [LoginProvider] NVARCHAR(450) NOT NULL,
        [Name] NVARCHAR(450) NOT NULL,
        [Value] NVARCHAR(MAX) NULL,
        CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
        CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );

    CREATE TABLE [Directories] (
        [Id] NVARCHAR(450) NOT NULL,
        [ParentId] NVARCHAR(MAX) NULL,
        [CanMove] BIT NOT NULL,
        [CanDelete] BIT NOT NULL,
        [Size] BIGINT NULL,
        [DateModified] DATETIME2 NULL,
        [SharedWithOwnerIds] NVARCHAR(MAX) NULL,
        [Name] NVARCHAR(MAX) NOT NULL,
        [DateCreated] DATETIME2 NOT NULL,
        [UserId] NVARCHAR(450) NOT NULL,
        CONSTRAINT [PK_Directories] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Directories_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );

    CREATE TABLE [ProfileImages] (
        [Id] NVARCHAR(450) NOT NULL,
        [ImageMnemonic] NVARCHAR(MAX) NOT NULL,
        [Data] VARBINARY(MAX) NOT NULL,
        [UserId] NVARCHAR(450) NOT NULL,
        CONSTRAINT [PK_ProfileImages] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ProfileImages_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );

    CREATE TABLE [Files] (
        [Id] NVARCHAR(450) NOT NULL,
        [CanMove] BIT NULL,
        [CanDelete] BIT NULL,
        [FileSize] BIGINT NOT NULL,
        [DateModified] DATETIME2 NULL,
        [SharedWithOwnerIds] NVARCHAR(MAX) NULL,
        [Name] NVARCHAR(MAX) NOT NULL,
        [DateCreated] DATETIME2 NOT NULL,
        [FileType] INT NOT NULL,
        [DirectoryId] NVARCHAR(450) NOT NULL,
        CONSTRAINT [PK_Files] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Files_Directories_DirectoryId] FOREIGN KEY ([DirectoryId]) REFERENCES [Directories] ([Id]) ON DELETE CASCADE
    );

    CREATE TABLE [FilesData] (
        [Id] NVARCHAR(450) NOT NULL,
        [FileId] NVARCHAR(450) NOT NULL,
        [Data] VARBINARY(MAX) NOT NULL,
        [FileMnemonic] NVARCHAR(MAX) NOT NULL,
        CONSTRAINT [PK_FilesData] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_FilesData_Files_FileId] FOREIGN KEY ([FileId]) REFERENCES [Files] ([Id]) ON DELETE CASCADE
    );

    CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);   
    CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;
    CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);   
    CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);   
    CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);     
    CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);
    CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;
    CREATE INDEX [IX_Directories_UserId] ON [Directories] ([UserId]);
    CREATE INDEX [IX_Files_DirectoryId] ON [Files] ([DirectoryId]);
    CREATE INDEX [IX_FilesData_FileId] ON [FilesData] ([FileId]);
    CREATE INDEX [IX_ProfileImages_UserId] ON [ProfileImages] ([UserId]);

    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240526123627_initialMigration', N'8.0.5');
END;
GO
