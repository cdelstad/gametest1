interface Position {
    x: number,
    y: number,
    zIndex?: number // Should allow a user to set/update a z-index? Or do we allow this to be set separately like setZIndex()?
};

// TODO Confirm this is the correct way to enforce the callback function provided takes an x and y param. How to enforce it returns an x/y? is a vector
type PosCallback = (x: number, y: number) => any;

interface Element {
    id: string, // Element ID
    ref?: HTMLElement, // reference to the element in the DOM
    worldPos: Position, // position on the canvas/world space
    screenPos: Position, // position on the screen
    isComposite: boolean, // Is this element a composite
    // children?: Element[], // Can I do this? this will be used to organize children in composite elements.
    isVisible: boolean, // Should this be visible on the screen?
    isReady: boolean, // Is the element ready to be used? Set default in create/register functions.
    zIndex: number, // To allow for control over layering, especially on composite elements
    pointerEvent: string // This sets behavior on whether pointer events should passthrough to the canvas?
};

interface Config {
    // TODO should these callbacks accept a return value of a vector or object instead of idividual values? {x,y}?
    baseZIndex: number,
    // TODO make these required once I get most of this class completed.
    worldToScreenCallback?: PosCallback, // This is the function used to translate from world to screen coordinates
    screenToWorldCallback?: PosCallback, // This is the function used to translate from screen to world coordinates
    
}

class UIManager {
    // TODO is this the right way to initialize this?
    registry: Element[] = [];
    instance!: UIManager;
    uiContainer!: HTMLElement;

    initRegistry(config: Config) {
        // TODO Check for aria-live-root and if not found, add it and setup this region

        this._createContainer();

        // The UI Manager needs to be a singleton.
        // TODO should I be checking that instance is a typeof UIManager? Need to confirm that this will always be an object and only return from the if statement. 
        // It seems to be working when I try to create another UIManager.
        if (typeof this.instance === 'object'){ return this.instance;}
        this.instance = this;
        return this.instance;
    }

    // Return current UI registry
    getRegistry() {
        return this.registry;
    };

    // reset the registry to initial empty state
    clearRegistry() {
        // TODO not sure this is the right way to do this with TypeScript.
        this.registry = [];
    }

    // Return DOM element ref from registry by id
    getElement(id: String) {
        return this.registry.find(x => x.id === id)?.ref;
    };
    
    // Hide all UI elements in registry
    hideAll() {

    }

    // Show all UI elements in registry
    showAll(waitForReady?: Boolean) {
        // If waitForReady = true, then setInterval and wait until all elements are in a ready state before making any visible. 
        // A use case for this is when values need to be loaded from the cloud such as health, etc.

    }

    // Creates a UI element using internal components, registers it, and adds it to the DOM
    create( elem: Element) {
        // Check if id exists in DOM
        if (!document.getElementById(elem.id)) {
            const button = document.createElement("button");
            button.innerText = 'Click me!';
            button.id = elem.id;
            button.style.position = "absolute";
            button.style.top = elem.screenPos.x+'px';
            button.style.left = elem.screenPos.y+'px';
            this.uiContainer.appendChild(button);

            elem.ref = button;
            this.registry?.push(elem);
        } else {
            console.error("UI Manager: '"+elem.id+"' ID exists, cannot add a duplicate. Please make the ID unique.");
        }

    }

    // Remove an element by ID (DOM and registry)
    // updates existing array instead of returning a new array
    remove(id: string) {
        this.getElement(id)?.remove();
        // Remove element from registry array
        const indexToRemove = this.registry.findIndex(item => item.id === id);
        if (indexToRemove > -1) {
            this.registry.splice(indexToRemove, 1);
        }
    }

    // Registers an already created element in the DOM
    register(elem: HTMLElement) {
        this.registry?.push(
            {
                id: elem.id,
                ref: elem,
                worldPos: {x:1,y:1}, // TODO add calculation here with screenToWorldCallback?
                screenPos: {x:parseInt(elem.style.top,10),y:parseInt(elem.style.left,10)},
                isComposite: false, // need to make dynamic - do we look to see if more element children or require user to pass in this flag??
                // children?: Element[],
                isVisible: this._calcVisibility(elem),
                isReady: true,  // need to make dynamic
                zIndex: 10, // need to make dynamic
                pointerEvent: 'all' // need to make dynamic
            }
        );
        
    }

    // Allows you to compose your own HTML, create composite components, and then register them
    compose() {
        // TODO may need to start by users creating each HTMLElement individually, but need to look at how to generate html - maybe a Lit component that uses lit HTML ``?
    }
  
    // Set container to house all UI Elements
    private _createContainer() {
        if (!this.uiContainer) {
            const container = document.createElement("div");
            container.id = "uicontainer-"+ this._generateUniqueId();
            document.body.appendChild(container);
            this.uiContainer = container;
        }
    }

    // Internal register functionality
    private _register() {
        // Check for duplicate ID
        // TODO Should we also check for dupe reference so the same DOM element cannot be registered twice??

    }

    private _setScreenPos() {

    }

    private _setWorldPos() {

    }

    // Calculates whether a DOM element is visible checking display, visibility, etc and returns true/false
    _calcVisibility(elem: HTMLElement) {
        if (elem.style.visibility === 'hidden') { return false;};
        return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
    }

    // Generates a unique id. Looks like this: m56w6q1o0ynlbofiluea
    _generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

}

// make sure to call uiManager.init(engine) in your main file
export const uiManager = new UIManager()