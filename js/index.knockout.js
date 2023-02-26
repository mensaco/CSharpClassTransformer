
String.prototype.toCamelCase = function() {
    var s = this;
    if (!s) return "";
    const s1 = s[0].toLowerCase();
    if (s.length == 1) return s1

    return s1 + s.substring(1)
}



// -----------------------------------------
function CopyElementContentsToClipboard(e) {
    var element = e.srcElement.parentElement.parentElement.nextElementSibling

    if (element.textContent) {
        navigator.clipboard.writeText(element.textContent);
        return;
    }

    // Copy the text inside the text field
    if (element.value) {
        navigator.clipboard.writeText(element.value);
        // Select the text field
        element.select();
        element.setSelectionRange(0, 99999); // For mobile devices
    }
    else {
        console.log("Element property to copy not implemented.")
    }
}


/* Add one or more listeners to an element
** @param {DOMElement} element - DOM element to add listeners to
** @param {string} eventNames - space separated list of event names, e.g. 'click change'
** @param {Function} listener - function to attach for each event as a listener
*/
function addListenerMulti(element, eventNames, listener) {
    var events = eventNames.split(' ');
    for (var i = 0, iLen = events.length; i < iLen; i++) {
        element.addEventListener(events[i], listener, false);
    }
}

function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

ko.bindingHandlers.editableHTML = {
    init: function (element, valueAccessor) {
        var observable = valueAccessor();
        element.setAttribute('contenteditable', 'true')
        addListenerMulti(element, 'keyup input cut paste drag dragdrop', function () {
            observable(element.textContent);
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        element.innerHTML = value;
    }
};

ko.components.register("eye-button", {
    template: `
    <div class="overflow-hidden" data-bind="if: !show(), click: onClick">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" class="cursor-pointer w-6 h-6"
    data-bind="click: onClick, class: css">
    <title>show the content</title>
    <path stroke-linecap="round" stroke-linejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
    </div>   

    <div class="overflow-hidden" data-bind="if: show(), click: onClick">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" class="cursor-pointer w-6 h-6"
    data-bind="click: onClick, class: css">
    <title>hide the content</title>
    <path stroke-linecap="round" stroke-linejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
   </div> 
`,
    viewModel: function (params) {
        var self = this;
        self.show = ko.observable(params.show)
        self.css = ko.observable(params.css)
        self.onClick = function (data, event) {
            event.stopPropagation()
            params.action();
            self.show(!self.show())
        }
    }
})

ko.components.register("eye-open-button", {
    template: `<!-- ko if: show() -->
    <div>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="cursor-pointer w-6 h-6"
        data-bind="click: onClick, class: css">
        <title>show the content</title>
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    </div>   
<!-- /ko -->

`,
    viewModel: function (params) {
        var self = this;
        self.show = ko.observable(params.show)
        self.css = ko.observable(params.css)
        self.onClick = function () {
            params.action();
        }
    }
})

ko.components.register("eye-closed-button", {
    template: `
    <!-- ko if: show() -->
    <div>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" class="cursor-pointer w-6 h-6"
    data-bind="click: onClick, class: css">
    <title>hide the content</title>
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
    </div>   
<!-- /ko -->
`,
    viewModel: function (params) {
        var self = this;
        self.show = ko.observable(params.show)
        self.css = ko.observable(params.css)
        self.onClick = function () {
            params.action();
        }
    }
})

ko.components.register("copy-icon-button", {
    template: `
    <!-- ko if: show() -->
    <div>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" class="cursor-pointer w-6 h-6"
    data-bind="click: onClick, class: css">
    <title>copy the content</title>
    <path stroke-linecap="round" stroke-linejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
</svg>
    </div>
   
<!-- /ko -->
`,
    viewModel: function (params) {
        var self = this;
        self.show = ko.observable(params.show)
        self.css = ko.observable(params.css)
        self.onClick = function () {
            params.action();
        }
    }
})

ko.components.register("card", {
    template: `
    <div class="flex items-center justify-between p-2" data-bind="class: headerCss">
            <div data-bind="text: title"></div>
            <div class="flex justify-end flex-nowrap items-center gap-x-3">
                <eye-button params="show: true, css: 'text-amber-200 hover:text-white', action: () => showContent(!showContent())"></eye-button>
                <copy-icon-button params="show: showContent(), css: 'text-amber-200 hover:text-white', action:  () => console.log('copy')"></copy-icon-button>
            </div>
        </div>
        <div data-bind="if: showContent">
            <pre data-bind="text: content()"></pre>
        </div>
`,
    viewModel: function (params) {
        var self = this;
        self.showContent = ko.observable(params.showContent)
        self.title = ko.observable(params.title)
        self.content = ko.observable(params.content)
        self.headerCss = ko.observable(params.headerCss)
        self.onCopy = function () {
            params.copyAction();
        }
    }

})

ko.components.register("input-card", {
    template: `
    <div class="flex items-center justify-between p-2" data-bind="class: headerCss">
            <div data-bind="text: title"></div>
            <div class="flex justify-end flex-nowrap items-center gap-x-3">
                <eye-open-button params="show: !showContent(), css: 'text-amber-200 hover:text-white', action: () => showContent(true)"></eye-open-button>
                <eye-closed-button params="show: showContent(), css: 'text-amber-200 hover:text-white', action:  () => showContent(false)"></eye-closed-button>
                <copy-icon-button params="show: showContent(), css: 'text-amber-200 hover:text-white', action:  () => console.log('copy')"></copy-icon-button>
            </div>
        </div>
        <div data-bind="if: showContent">
            <pre data-bind="editableHTML: content(), class: contentCss" class="font-sans"></pre>
        </div>
`,
    viewModel: function (params) {
        var self = this;
        self.showContent = ko.observable(params.showContent)
        self.title = ko.observable(params.title)
        self.content = ko.observable(params.content)
        self.headerCss = ko.observable(params.headerCss)
        self.contentCss = ko.observable(params.contentCss)
        self.onCopy = function () {
            params.copyAction();
        }
    }

})



// -----------------------------------------
class ViewModel {
    constructor() {
        var self = this;

        self.txtDiv = document.createElement("div")

        self.showInputContent = ko.observable(true)

        self.inputHtml = ko.observable(Settings.Templates.CSharp.InitialClass);

        self.copy = function (text) {
            if (navigator && navigator.clipboard) {
                self.txtDiv.textContent = text
                navigator.clipboard.writeText(self.txtDiv.textContent)
            }
        }

        self.className = ko.pureComputed(function () {
            // extract class name
            const cn = Settings.RegExp["ForC#ClassName"];
            const clasRegex = new RegExp(cn.Expression, cn.Flags);
            var cnl = [];
            self.inputHtml().replace(clasRegex, function (m, p1) { cnl.push(p1); });
            if (cnl && cnl.length == 1) {
                return cnl[0];
            }
            return "";
        });

        self.properties = ko.pureComputed(function () {
            // extract simple C# property names and types
            const pp = Settings.RegExp["ForC#Properties"];
            const r = new RegExp(pp.Expression, pp.Flags);
            var a = [];
            self.inputHtml().replace(r, function (m, p1, p2) {
                a.push([p2, p1])
            })

            return a;
        })

        self.keyProperties = ko.pureComputed(function () {
            // extract properties decorated with the [Key] - attribute
            const pp = Settings.RegExp.ForKeyAttribute;
            const r = new RegExp(pp.Expression, pp.Flags)
            var a = []
            self.inputHtml().replace(r, function (m, p1) {
                a.push(p1);
            });
            return a;
        })

        self.filterClass = ko.pureComputed(function () {
            const pretext = `
using CommunityToolkit.Mvvm.ComponentModel;
namespace {Namespace};

public partial class ${self.className()}Filter: ObservableObject
{
`

            const posttext = `
}
`

            const body = self.properties().map(x => `
    [ObservableProperty] 
    private ${x[1]} _${x[0]};`).join('\r\n\t')

            return pretext + body + posttext
        })


        self.filterAttributes = ko.pureComputed(function () {

            const body = self.properties().map(x => `string? ${x[0].toCamelCase()}`).join(', ')

            return body
        })


        self.linqFilter = ko.pureComputed(function () {
            const className = self.className().toCamelCase()

            const L = (t) => Settings.Templates.CSharp.Controller.Filter.Linq[t] || `// ?? ${t} ??`

            const body = self.properties().map(x =>
                L(x[1])
                    .replace(/\{model\}/g, className)
                    .replace(/\{Property\}/g, x[0])
            ).join('\r\n')

            return body
        })

        self.blazorDisplay = ko.pureComputed(function () {
            const className = self.className().toCamelCase()

            const T = () => Settings.Templates.Blazor.Display

            const body = self.properties().map(x =>
                T()
                    .replace(/\{model\}/g, className)
                    .replace(/\{label\}/g, x[0])
                    .replace(/\{Property\}/g, x[0])
            ).join('\r\n')

            return body
        })

        self.blazorInput = ko.pureComputed(function () {
            const className = self.className().toCamelCase()

            const T = (t) => Settings.Templates.Blazor.Types[t] || `<!-- ?? ${t} ?? -->`

            const I = () => Settings.Templates.Blazor.Input

            const body = self.properties().map(x =>
                I()
                    .replace(/\{model\}/g, className)
                    .replace(/\{label\}/g, x[0])
                    .replace(/\{type\}/g, T(x[1]))
                    .replace(/\{Property\}/g, x[0])
            ).join('\r\n')

            return body
        })


    }
}


window.vM = new ViewModel();

ko.applyBindings(window.vM);