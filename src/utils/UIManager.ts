// import * as ex from 'excalibur'

interface Position {
    x: Number,
    y: Number,
    zIndex?: Number // Should allow a user to set/update a z-index? Or do we allow this to be set separately like setZIndex()?
};

// TODO Confirm this is the correct way to enforce the callback function provided takes an x and y param. How to enforce it returns an x/y?
type PosCallback = (x: Number, y: Number) => any;

interface Element {
    id: String, // Element ID
    ref: HTMLElement, // reference to the element in the DOM
    worldPos: Position, // position on the canvas/world space
    screenPos: Position, // position on the screen
    isComposite: Boolean, // Is this element a composite
    children?: Element[], // Can I do this? this will be used to organize children in composite elements.
    isVisible: Boolean, // Should this be visible on the screen?
    isReady: Boolean, // Is the element ready to be used? Set default in create/register functions.
    zIndex: Number, // To allow for control over layering, especially on composite elements
    pointerEvent: String // This sets behavior on whether pointer events should passthrough to the canvas?
};

interface Config {
    // TODO should these callbacks accept a return value of a vector or object instead of idividual values? {x,y}?
    baseZIndex: Number,
    worldToScreenCallback: PosCallback, // This is the function used to translate from world to screen coordinates
    screenToWorldCallback: PosCallback, // This is the function used to translate from screen to world coordinates
    
}

class UIManager {
    private registry: Element[] | null = null

    initRegistry(config: Config) {
        // TODO Check for aria-live-root and if not found, add it and setup this region
        // add logic to make this a singleton
        // if(!this.registry) { this.registry = Element[] }
        // this.engine = engine;

    }

    // Return current UI registry
    getRegistry() {

    };

    // reset the registry to initial empty state
    clearRegistry() {

    }

    // Return DOM element ref from registry by string?
    getElement(id: String) {

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
    create() {
    }

    // Remove an element by ID
    remove() {

    }

    // Registers an already created element in the DOM
    register() {

    }

    // Allows you to compose your own HTML, create composite components, and then register them
    compose() {

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

}

/// TODO will this break being a singleton by doing new here?
// make sure to call uiManager.init(engine) in your main file
export const uiManager = new UIManager()