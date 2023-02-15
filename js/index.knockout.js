ko.bindingHandlers.editableHTML = {
    init: function (element, valueAccessor) {
        //var $element = $(element);
        var initialValue = ko.utils.unwrapObservable(valueAccessor());
        element.innerHTML = initialValue;
        element.addEventListener('keyup', function () {
            observable = valueAccessor();
            observable(element.innerHTML);
        });
    }
};

function Camel(s) {
    if (!s) return "";
    const s1 = s[0].toLowerCase();
    if (s.length == 1) return s1

    return s1 + s.substring(1)
}

class ViewModel {
    constructor() {
        var self = this;       

        self.inputHtml = ko.observable(`
    using System;
using System.Collections.Generic;

namespace Saalreservierung.Models;

public partial class Room
{
    public Guid Id { get; set; }

    public int? SrcId { get; set; }

    public string Name { get; set; } = null!;

    public string? Number { get; set; }

    public bool? Approved { get; set; }

    public bool? Locked { get; set; }

    public bool? IsExternal { get; set; }

    public bool? UiShowInOverview { get; set; }

    public bool? UiUseAsFilter { get; set; }

    public int? UiSortOrder { get; set; }

    public string? Building { get; set; }

    public string? MaxPersonsNumText { get; set; }

    public string? Phone { get; set; }

    public string? Comment { get; set; }

    public virtual ICollection<Reservation> Reservations { get; } = new List<Reservation>();

    public virtual ICollection<RoomBooking> RoomBookings { get; } = new List<RoomBooking>();

    public virtual RoomCalender? RoomCalender { get; set; }
}

    `);

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

        self.camelClassName = ko.pureComputed(function(){
            return Camel(self.className());
        })

        self.propList = ko.pureComputed(function () {
            // extract properties
            const pp = Settings.RegExp["ForC#Properties"];
            const r = new RegExp(pp.Expression, pp.Flags);
            var a = [];
            self.inputHtml().replace(r, function (m, p1) { a.push(p1.split(' ')); });
            return a;
        });


        self.properties = ko.pureComputed(function () {
            return self.propList().map(x => x[0] + ' ' + x[1]).join('\r\n');
        }, self);

        self.blazorInputs = ko.pureComputed(function () {
            const T = Settings.Templates.Blazor.Input;
            const Ty = Settings.Templates.Blazor.Types;
            return self.propList().map(x => T
                .replace("{label}", x[1])
                .replace("{property}", Camel(x[1]))
                .replace("{type}", Ty[x[0]])
                .replace("{model}", self.camelClassName())
                );
        }, self);

        self.blazorDisplays = ko.pureComputed(function () {
            const T = Settings.Templates.Blazor.Display;
            const Ty = Settings.Templates.Blazor.Types;
            return self.propList().map(x => T
                .replace("{label}", x[1])
                .replace("{property}", Camel(x[1]))
                .replace("{model}", self.camelClassName()))
            }, self);




    }
}


var vM = new ViewModel();

ko.applyBindings(vM);