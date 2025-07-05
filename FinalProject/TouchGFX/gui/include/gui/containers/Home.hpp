#ifndef HOME_HPP
#define HOME_HPP

#include <gui_generated/containers/HomeBase.hpp>

class Home : public HomeBase
{
public:
    Home();
    virtual ~Home() {}

    virtual void initialize();
protected:
};

#endif // HOME_HPP
