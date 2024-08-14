import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const archive = mutation({
    args: {
        id: v.id("document")
    },
    async handler(ctx, args_0) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const userId = identity.subject
        const existingDocument = await ctx.db.get(args_0.id)
        if (!existingDocument) throw new Error("Not Found")
        if (existingDocument.userId !== userId) throw new Error("Unauthorized")
        const recursiveArchive = async (documentId: Id<"document">) => {
            const children = await ctx.db.query("document")
                .withIndex("by_user_parent", q => q.eq("userId", userId).eq("parentDocument", documentId))
                .collect()
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true
                })
                await recursiveArchive(child._id)
            }
        }
        const document = await ctx.db.patch(args_0.id, {
            isArchived: true
        })
        recursiveArchive(args_0.id)
        return document
    },
})

export const getArchived = query({
    async handler(ctx) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const userId = identity.subject
        const document = await ctx.db.query("document")
            .withIndex("by_user", q => q.eq("userId", userId))
            .filter(q => q.eq(q.field("isArchived"), true))
            .collect()
        return document
    },
})

export const reStore = mutation({
    args: {
        id: v.id("document")
    },
    async handler(ctx, args_0) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const userId = identity.subject
        const existingDocument = await ctx.db.get(args_0.id)
        if (!existingDocument) throw new Error("Not Found")
        if (existingDocument.userId !== userId) throw new Error("Unauthorized")
        const recursiveRestore = async (documentId: Id<"document">) => {
            const children = await ctx.db.query("document")
                .withIndex("by_user_parent", q => q.eq("userId", userId).eq("parentDocument", documentId))
                .collect()
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: false
                })
                await recursiveRestore(child._id)
            }
        }
        const options: Partial<Doc<"document">> = {
            isArchived: false
        }
        if (existingDocument.parentDocument) {
            const parent = await ctx.db.get(existingDocument.parentDocument)
            if (parent?.isArchived) {
                options.parentDocument = undefined
            }
        }
        const document = await ctx.db.patch(args_0.id, options)
        recursiveRestore(args_0.id)
        return document
    },
})

export const remove = mutation({
    args: {
        id: v.id("document")
    },
    async handler(ctx, args_0) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const userId = identity.subject
        const existingDocument = await ctx.db.get(args_0.id)
        if (!existingDocument) throw new Error("Not Found")
        if (existingDocument.userId !== userId) throw new Error("Unauthorized")
        const document = await ctx.db.delete(args_0.id)
        return document
    },
})

export const sideBarQuery = query({
    args: {
        parentDocument: v.optional(v.id("document"))
    },
    async handler(ctx, args_0) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const userId = identity.subject
        const document = await ctx.db.query("document")
            .withIndex("by_user_parent", (q) => q.eq("userId", userId).eq("parentDocument", args_0.parentDocument))
            .filter(q => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect()
        return document
    },
})

export const get = query({
    async handler(ctx) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const document = await ctx.db.query("document").collect()
        return document
    },
})

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("document"))
    },
    async handler(ctx, args_0) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const userId = identity.subject
        const document = await ctx.db.insert("document", {
            title: args_0.title,
            parentDocument: args_0.parentDocument,
            isArchived: false,
            isPublished: false,
            userId
        })
        return document
    },
})

export const getSearch = query({
    async handler(ctx) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const userId = identity.subject
        const document = await ctx.db.query("document")
            .withIndex("by_user", q => q.eq("userId", userId))
            .filter(q => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect()
        return document
    },
})

export const getById = query({
    args: {
        id: v.id("document")
    },
    async handler(ctx, args_0) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const document = await ctx.db.get(args_0.id);
        if (document?.userId !== identity.subject) throw new Error("Unauthorized")
        if (!document) throw new Error("Document Not Found");
        if (document.isPublished && !document.isArchived) {
            return document
        }
        return document
    },
})

export const update = mutation({
    args: {
        id: v.id("document"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean())
    },
    async handler(ctx, args_0) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const { id, ...rest } = args_0
        const document = await ctx.db.get(args_0.id);
        if (!document) throw new Error("Document Not Found");
        if (document?.userId !== identity.subject) throw new Error("Unauthorized")
        const updatedDocument = await ctx.db.patch(args_0.id, {
            ...rest
        });
        return updatedDocument
    },
})

export const removeIcon = mutation({
    args: {
        id: v.id("document")
    },
    async handler(ctx, args_0) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const document = await ctx.db.get(args_0.id);
        if (!document) throw new Error("Document Not Found");
        if (document?.userId !== identity.subject) throw new Error("Unauthorized")
        const updatedDocument = await ctx.db.patch(args_0.id, {
            icon: undefined
        });
        return updatedDocument
    },
})

export const removeCoverImage = mutation({
    args: {
        id: v.id("document")
    },
    async handler(ctx, args_0) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not Authenticated");
        const document = await ctx.db.get(args_0.id);
        if (!document) throw new Error("Document Not Found");
        if (document?.userId !== identity.subject) throw new Error("Unauthorized")
            const updatedDocument = await ctx.db.patch(args_0.id, {
                coverImage: undefined
            });
            return updatedDocument
    },
})