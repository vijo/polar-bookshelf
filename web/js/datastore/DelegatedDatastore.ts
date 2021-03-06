import {Datastore, FileMeta, FileRef, InitResult} from './Datastore';
import {Directories} from './Directories';
import {DocMetaFileRef, DocMetaRef} from './DocMetaRef';
import {DeleteResult} from './Datastore';
import {Preconditions} from '../Preconditions';
import {Backend} from './Backend';
import {DatastoreFile} from './DatastoreFile';
import {Optional} from '../util/ts/Optional';
import {IDocInfo} from '../metadata/DocInfo';
import {DatastoreMutation} from './DatastoreMutation';

/**
 * A datastore that just forwards events to the given delegate.
 */
export class DelegatedDatastore implements Datastore {

    public readonly directories: Directories;

    public readonly logsDir: string;

    public readonly stashDir: string;

    public readonly filesDir: string;

    private readonly delegate: Datastore;

    constructor(delegate: Datastore) {
        Preconditions.assertPresent(delegate, 'delegate');
        this.delegate = delegate;
        this.directories = new Directories();
        this.logsDir = delegate.logsDir;
        this.stashDir = delegate.stashDir;
        this.filesDir = this.directories.filesDir;

    }

    public contains(fingerprint: string): Promise<boolean> {
        return this.delegate.contains(fingerprint);
    }

    public delete(docMetaFileRef: DocMetaFileRef): Promise<Readonly<DeleteResult>> {
        return this.delegate.delete(docMetaFileRef);
    }

    public writeFile(backend: Backend, ref: FileRef, data: Buffer | string, meta: FileMeta = {}): Promise<DatastoreFile> {
        return this.delegate.writeFile(backend, ref, data, meta);
    }

    public containsFile(backend: Backend, ref: FileRef): Promise<boolean> {
        return this.delegate.containsFile(backend, ref);
    }

    public getFile(backend: Backend, ref: FileRef): Promise<Optional<DatastoreFile>> {
        return this.delegate.getFile(backend, ref);
    }

    public deleteFile(backend: Backend, ref: FileRef): Promise<void> {
        return this.delegate.deleteFile(backend, ref);
    }

    public getDocMeta(fingerprint: string): Promise<string | null> {
        return this.delegate.getDocMeta(fingerprint);
    }

    public getDocMetaFiles(): Promise<DocMetaRef[]> {
        return this.delegate.getDocMetaFiles();
    }

    public init(): Promise<InitResult> {
        return this.delegate.init();
    }

    public stop(): Promise<void> {
        return this.delegate.stop();
    }

    public write(fingerprint: string, data: any, docInfo: IDocInfo, datastoreMutation?: DatastoreMutation<boolean>): Promise<void> {
        return this.delegate.write(fingerprint, data, docInfo, datastoreMutation);
    }

}
