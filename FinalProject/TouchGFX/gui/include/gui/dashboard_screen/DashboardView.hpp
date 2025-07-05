#ifndef DASHBOARDVIEW_HPP
#define DASHBOARDVIEW_HPP

#include <gui_generated/dashboard_screen/DashboardViewBase.hpp>
#include <gui/dashboard_screen/DashboardPresenter.hpp>

class DashboardView : public DashboardViewBase
{
public:
    DashboardView();
    virtual ~DashboardView() {}
    virtual void setupScreen();
    virtual void tearDownScreen();
protected:
};

#endif // DASHBOARDVIEW_HPP
