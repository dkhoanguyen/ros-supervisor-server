import mongoose from "mongoose";
import { collections } from "../mongodb/schema/collections"

export interface DBAuth {
    DB_HOST: string
    DB_PORT: string
    DB_NAME: string
}

// Should we change this to not be asynchronous ?
export default async function connect(
    {
        DB_HOST: host,
        DB_PORT: port,
        DB_NAME: name,
    }: DBAuth
): Promise<mongoose.Connection | undefined> {
    const dbUri = `mongodb://${host}:${port}/${name}`
    // Create a connection to the database
    try {
        await mongoose.connect(dbUri)
        const connection = mongoose.connection
        // Create collections
        createCollections(connection)
        return connection
    } catch (error) {
        console.error(error)
        return undefined
    }
}

async function createCollection(
    connectionObj: mongoose.Connection,
    collectionName: string,
): Promise<void> {
    // Check if collection exists
    const existingCollection = await connectionObj.db.listCollections().toArray()
    let collectionExist: boolean = false
    for (let collection in existingCollection) {
        if (collection === collectionName) {
            collectionExist = true
            break
        }
    }
    // Only create collection if it does not exists
    if(!collectionExist) {
        await connectionObj.createCollection(collectionName).then(() => {
            console.log(`Created collection: ${collectionName}`)
        })
    } else {
        console.log("Collection already exists. Skipping collection creation")
    }
}

async function createCollections(
    connectionObj: mongoose.Connection
): Promise<void> {
    for (let collection of collections) {
        await createCollection(connectionObj, collection)
    }
}