import {IPersistenceLayer} from '../IPersistenceLayer';
import {IListenablePersistenceLayer} from '../IListenablePersistenceLayer';
import {AbstractAdvertisingPersistenceLayer} from './AbstractAdvertisingPersistenceLayer';
import {PersistenceLayerEvent} from '../PersistenceLayerEvent';

/**
 * A PersistenceLayer that allows the user to receive advertisements regarding
 * updates to the internal data.
 */
export class MockAdvertisingPersistenceLayer
    extends AbstractAdvertisingPersistenceLayer
    implements IListenablePersistenceLayer {

    constructor(persistenceLayer: IPersistenceLayer) {
        super(persistenceLayer);
    }

    public async init(): Promise<void> {
        // noop
    }

    public async stop(): Promise<void> {
        // noop
    }

    public broadcastEvent(event: PersistenceLayerEvent): void {
        // NOTE that technically this violates our main contract that persistence
        // layers don't re-notify themselves.  I need to revisit this because
        // it might make sense to allow them to notify themselves but just be
        // careful or add another mode 'promiscuous' to see all events.  Maybe
        // to be safe by default but add another mode if necessary.
        this.dispatchEvent(event);
    }

}
